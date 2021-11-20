import { TripsLayer } from '@deck.gl/geo-layers';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import { useEffect, useState, useCallback } from 'react';
import _ from "lodash";
import polyline from "@mapbox/polyline";
import { _MapContext } from 'react-map-gl';

export default function Layer({ viewState }) {
  const [divider, setDivider] = useState(3600 * 1000 * 24); // default to 24h
  const animationSpeed = 1;// 3600 * 1000 * 24 / 1500; // 24h has 1500 steps, total ~25s
  const [time, setTime] = useState(2000);
  const [animation] = useState({});

  const animate = useCallback(() => {
    setTime(t => ((t + animationSpeed) % divider));
    /*
    if (time + animationSpeed > divider) {
      setTime(divider - 1);
      setAnimationSpeed(-1);
    } else if (time + animationSpeed < 0) {
      setTime(1);
      setAnimationSpeed(1);
    }
    */
    animation.id = window.requestAnimationFrame(animate);
  }, [animation, animationSpeed, divider]);

  const [data, setData] = useState([]);
  const [coverage, setCoverage] = useState({features: []});

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
      const fetched = await fetch("/routes_10270.geojson");
      //const coverage = await fetch("/4G_tahtiluokka_3_simplified.json");
      //const coverageJson = await coverage.json();
      //setCoverage(coverageJson);
      const routeJson = await fetched.json();
      // add timestamps to each linestring
      const cloned = _.cloneDeep(routeJson);
      const newFeatures = _.reverse([...routeJson.features, ..._.reverse(cloned.features)]);
      _.reverse(newFeatures);
      const timestamps = newFeatures.map(feature => {
        return _.range(0, feature.geometry.coordinates.length);
      });
      // const lines = (await fetched.text()).split("\n");
      // zip timestamps and features
      const data1 = _.zip(timestamps, newFeatures).map(([timestamp, feature]) => {
        const c = _.cloneDeep(feature.geometry.coordinates);
        _.reverse(c);
        const coords = [...feature.geometry.coordinates, ...c];
        return {waypoints: _.zip(timestamp, feature.geometry.coordinates).map(([timestamp, coordinates]) => {
          return {
            coordinates,
            timestamp
          };
        })};
      });
      const d = data1;

      /*
      const d = lines.filter(line => line).map((line) => {
        const parsed = JSON.parse(line);
        return {waypoints: 
          _.zip(polyline.decode(parsed[0]), parsed[1]).map(line => ({
            coordinates: line[0],
            timestamp: line[1]
          })) 
        };
      });*/
      console.log(d);
      setData(d);
    })();
  }, []);

  useEffect(
    () => {
      animation.id = window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(animation.id);
    },
    [animation, animate]
  );

  useEffect(() => {
    if (data.length === 0) return;
    // get maximum timestamp from data
    let min = Infinity;
    let max = 0;
    data.forEach(d => d.waypoints.forEach(list => {
      if (list.timestamp > max) {
        max = list.timestamp;
      }
      if (list.timestamp < min) {
        min = list.timestamp;
      }
    }));
    // get minimum timestamp from data
    setDivider(max - min);
  }, [data]);
  const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: coverage,
    stroked: false,
    filled: true,
    extruded: true,
    pointType: 'circle',
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getLineColor: [0, 255, 0],
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30
  });
  const layer2 = new TripsLayer({
    id: 'trips-layer',
    data,
    getPath: d => d.waypoints.map(p => p.coordinates),
    // deduct start timestamp from each data point to avoid overflow
    getTimestamps: d => d.waypoints.map(p => p.timestamp),
    getColor: [92, 181, 249],
    opacity: 0.2,
    widthMinPixels: 5,
    rounded: true,
    fadeTrail: true,
    getWidth: d => 5,
    trailLength: animationSpeed * 150 * 5,
    currentTime: time,

    shadowEnabled: false
  });
  return <DeckGL useDevicePixels={false} viewState={viewState} layers={[layer2]} />;
};