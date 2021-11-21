import { TripsLayer } from '@deck.gl/geo-layers';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { useEffect, useState, useCallback } from 'react';
import _ from "lodash";
import polyline from "@mapbox/polyline";
import { _MapContext } from 'react-map-gl';
import { color } from '@mui/system';

export default function Layer({ viewState }) {
  const [coverage, setCoverage] = useState({ features: [] });
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    (async () => {
      const coverage = await fetch("/postinumeroalue_filtered1.geojson");
      const coverageJson = await coverage.json();

      setCoverage(coverageJson);
    })();
  }, []);

  var layer = null
  if (visible) layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: coverage,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    pointType: 'circle',
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getLineColor: [160, 0, 0, 200],
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30,
    autoHighlight: true,
    onClick: (info, event) => {
      setVisible(false)
    }
  });
  return <DeckGL useDevicePixels={false} viewState={viewState} layers={[layer]} />;
};