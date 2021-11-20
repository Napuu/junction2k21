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
  const [coverage, setCoverage] = useState({features: []});
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
      const fetched = await fetch(`https://share.napuu.xyz/${dateValue.toISOString().slice(0, 10)}_poly`);
      // iterate through each row of fetched
      const lines = (await fetched.text()).split("\n");
      const routeJson = {
        "type": "FeatureCollection",
        "features": lines.filter(line => line).map((line) => {
          return polyline.toGeoJSON(line);
        })
      }
      const timestamps = routeJson.features.map(feature => {
        return _.range(0, feature.coordinates.length);
      });
      const data = _.zip(timestamps, routeJson.features).map(([timestamp, feature]) => {
        return {waypoints: _.zip(timestamp, feature.coordinates).map(([timestamp, coordinates]) => {
          return {
            coordinates,
            timestamp
          };
        })};
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
    if (transmissionPower === 1) {
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
    data: "/pointscov.json",
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
    getColor: [92, 181, 249],
    opacity: 0.01,
    widthMinPixels: 5,
    rounded: true,
    fadeTrail: true,
    getWidth: d => 5,
    trailLength: animationSpeed * 150,
    currentTime: time,

    shadowEnabled: false
  });
  return <DeckGL useDevicePixels={false} viewState={viewState} layers={[layer, layer2]} />;
};