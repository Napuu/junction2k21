import { TripsLayer } from '@deck.gl/geo-layers';
import DeckGL from '@deck.gl/react';
import { useEffect, useState, useCallback } from 'react';
import _ from "lodash";
import polyline from "@mapbox/polyline";

export default function Layer({ viewState }) {
  const [divider, setDivider] = useState(3600 * 1000 * 24); // default to 24h
  const animationSpeed = 3600 * 1000 * 24 / 1500; // 24h has 1500 steps, total ~25s
  const [time, setTime] = useState(0);
  const [animation] = useState({});

  const animate = useCallback(() => {
    setTime(t => (t + animationSpeed) % divider);
    animation.id = window.requestAnimationFrame(animate);
  }, [animation, animationSpeed, divider]);

  const [data, setData] = useState([]);

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
      const fetched = await fetch("/ships");
      const lines = (await fetched.text()).split("\n");
      const d = lines.filter(line => line).map((line) => {
        const parsed = JSON.parse(line);
        return {waypoints: 
          _.zip(polyline.decode(parsed[0]), parsed[1]).map(line => ({
            coordinates: line[0],
            timestamp: line[1]
          })) 
        };
      });
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
  const layer = new TripsLayer({
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

  return <DeckGL useDevicePixels={false} viewState={viewState} layers={[layer]} />;
};