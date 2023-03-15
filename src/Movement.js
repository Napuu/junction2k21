import { TripsLayer } from '@deck.gl/geo-layers';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import { useEffect, useState, useCallback } from 'react';
import _ from "lodash";
import polyline from '@mapbox/polyline';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

export default function Layer({ viewState, state }) {
  const [divider, setDivider] = useState(3600 * 1000 * 24); // default to 24h
  const animationSpeed = 1;// 3600 * 1000 * 24 / 1500; // 24h has 1500 steps, total ~25s
  const [time, setTime] = useState(2000);
  const [animation] = useState({});

  const animate = useCallback(() => {
    setTime(t => ((t + animationSpeed) % divider));
    animation.id = window.requestAnimationFrame(animate);
  }, [animation, animationSpeed, divider]);

  const [data, setData] = useState([]);
  const [lkm, setLkm] = useState(0);
  const dateValue = state.dateValue;
  useEffect(() => {
    setData([
        {
          waypoints: [
          {coordinates: [24, 61], timestamp: 1636840097955 },
          {coordinates: [25,62], timestamp: 1636840097955 },
          {coordinates: [25, 63], timestamp: 1636840097975 }
          ]
        }
    ]);
    (async () => {
      if (!dateValue.toISOString) return;
      // const fetched = await fetch(`https://share.napuu.xyz/${dateValue.toISOString().slice(0, 10)}.geojson`);
      const poly = await fetch("/junction2k21/2019-11-04_poly");
      const lkm = await fetch("/junction2k21/2019-11-04_lkm");
      // iterate through each row of fetched
      const lines_poly = (await poly.text()).split("\n").filter(line => line);
      const lines_lkm = (await lkm.text()).split("\n").filter(line => line);
      let maxLkm = 0;
      const routeJson = {
        "type": "FeatureCollection",
        "features": _.zip(lines_poly, lines_lkm).map((zipped) => {
          const poly = zipped[0];
          const lkm = zipped[1];
          maxLkm = Math.max(maxLkm, parseInt(lkm));
          return {
            ...polyline.toGeoJSON(poly),
            properties: {
              lkm: parseInt(lkm)
            }
          };
        })
      }
      const lkm_clone = _.clone(lines_lkm).map(lkm => parseInt(lkm));
      lkm_clone.sort();
      setLkm(lkm_clone[Math.floor(lines_lkm.length / 2)]);
      const timestamps = routeJson.features.map(feature => {
        return _.range(0, feature.coordinates.length);
      });
      const data = _.zip(timestamps, routeJson.features).map(([timestamp, feature]) => {
        return {waypoints: _.zip(timestamp, feature.coordinates).map(([timestamp, coordinates]) => {
          return {
            coordinates,
            timestamp,
          };
        }),
        lkm: feature.properties.lkm,
      };
      });
      setDivider(timestamps.length);
      setTime(0)
      setData(data);
    })();
  }, [dateValue]);

  useEffect(
    () => {
      animation.id = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(animation.id);
    },
    [animation, animate]
  );
  const getStyle = (transmissionPower) => {
    if (transmissionPower === 1 || transmissionPower === 4) {
      return {
        radiusPixels: 30,
        intensity: 1.5,
        threshold: 0.7
      }
    } else if (transmissionPower === 2) {
      return {
        radiusPixels: 20,
        intensity: 0.5,
        threshold: 0.5
      }
    } else if (transmissionPower === 3) {
      return {
        radiusPixels: 10,
        intensity: 0.2,
        threshold: 0.1
      }
    } else {
      return {
        radiusPixels: 20,
        intensity: 0.5,
        threshold: 0.5
      }
    }
  }
  const layer = new HeatmapLayer({
    data: state.transmissionPower === 4 ? "/junction2k21/pointsopt2.json" : "/junction2k21/pointscov.json",
    id: 'heatmp-layer',
    pickable: false,
    getPosition: d => [d[0], d[1]],
    getWeight: d => 1,
    colorRange: [
      [254,237,222],
      [253,208,162],
      [253,174,107],
      [253,141,60],
      [230,85,13],
      [166,54,3],
    ],
    opacity: 0.8,
    ...getStyle(state.transmissionPower)
  })

  const layer2 = new TripsLayer({
    id: 'trips-layer',
    data,
    getPath: d => d.waypoints.map(p => p.coordinates),
    getTimestamps: d => d.waypoints.map(p => p.timestamp),
    // getColor: d => d.lkm > lkm ? [158,202,225] : [49,130,189],// [0, 181, 255 * (d.lkm / lkm)],
    getColor: [92, 181 ,250],// [0, 181, 255 * (d.lkm / lkm)],
    opacity: 0.01,
    widthMaxPixels: 8,
    widthMinPixels: 3,
    rounded: true,
    fadeTrail: true,
    getWidth: d => d.lkm / 2,
    trailLength: animationSpeed * 150,
    currentTime: state.transmissionPower === 4 ? 150 : time,
    shadowEnabled: false
  });
  return <DeckGL useDevicePixels={false} viewState={viewState} layers={[layer, layer2]} />;
};
