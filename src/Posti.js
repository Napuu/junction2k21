import { TripsLayer } from '@deck.gl/geo-layers';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { useEffect, useState, useCallback } from 'react';
import _ from "lodash";
import polyline from "@mapbox/polyline";
import { _MapContext } from 'react-map-gl';

export default function Layer({ viewState }) {
  const [coverage, setCoverage] = useState({ features: [] });

  useEffect(() => {
    (async () => {
      const coverage = await fetch("/postinumeroalue_filtered1.geojson");
      const coverageJson = await coverage.json();
      setCoverage(coverageJson);
    })();
  }, []);

  const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: coverage,
    stroked: true,
    filled: true,
    extruded: true,
    pointType: 'circle',
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: d => d.properties.color ? d.properties.color : [160, 0, 180, 200],
    getLineColor: [0, 255, 0, 255],
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
    pickable: true,
    onHover: (info, event) => {
      console.log("hover", info, event)
      if (info.object) {
        info.object.properties["color"] = [255, 0, 0];
      }
    },
    onClick: (info, event) => console.log("click", info, event),
  });
  return <DeckGL useDevicePixels={false} viewState={viewState} layers={[layer]} />;
};