import { TripsLayer } from '@deck.gl/geo-layers';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { useEffect, useState, useCallback } from 'react';
import _ from "lodash";
import polyline from '@mapbox/polyline';

export default function Layer({ viewState, dateValue }) {
    const [divider, setDivider] = useState(3600 * 1000 * 24); // default to 24h
    const animationSpeed = 1;// 3600 * 1000 * 24 / 1500; // 24h has 1500 steps, total ~25s
    const [time, setTime] = useState(2000);
    const [animation] = useState({});

    const animate = useCallback(() => {
        setTime(t => ((t + animationSpeed) % divider));
        animation.id = window.requestAnimationFrame(animate);
    }, [animation, animationSpeed, divider]);

    const [data, setData] = useState([]);
    const [coverage, setCoverage] = useState({ features: [] });

    useEffect(() => {
        setData([
            {
                waypoints: [
                    { coordinates: [24, 61], timestamp: 1636840097955 },
                    { coordinates: [25, 62], timestamp: 1636840097955 },
                    { coordinates: [25, 63], timestamp: 1636840097975 }
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
                return {
                    waypoints: _.zip(timestamp, feature.coordinates).map(([timestamp, coordinates]) => {
                        return {
                            coordinates,
                            timestamp
                        };
                    })
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

    const layer = new GeoJsonLayer({
        id: 'geojson-layer',
        data: "/4G_tahtiluokka_3.json",
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
    return <DeckGL useDevicePixels={false} viewState={viewState} layers={[layer2]} />;
};