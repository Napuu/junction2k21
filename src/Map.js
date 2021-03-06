import { useEffect, useRef, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { basemaps } from "./BasemapSelector";
import Controls from './Controls';
import Ships from "./experiments/Ships";
import Movement from "./Movement";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const MAPBOX_TOKEN = "pk.eyJ1IjoicGFsaWtrIiwiYSI6ImNrdzZ2bDZ2YzBzZ3oydnJoODB4cmMzbmsifQ.ry-Lc5GvubrOySwQUtbjOg";
function Map({state}) {
  const location = useLocation();
  useEffect(() => {
    const index = basemaps.findIndex(b => b.title.toLocaleLowerCase() === location.pathname.split("/")[1]);
    if (index === -1) {
      setBaseMap(basemaps[0].url);
    } else {
      setBaseMap(basemaps[index].url);
    }
  }, [location.pathname]);

  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 60.323284,
    longitude: 24.904453,
    zoom: 9.3
  });

  const [basemap, setBaseMap] = useState(basemaps[1].url);
  const mapRef = useRef();
  window.onresize = () => {
    setViewport({
      ...viewport,
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  const [markers, setMarkers] = useState([]);
  const [addingLocations, setAddingLocations] = useState(false);

  const handleOnClick = (ev) => {
    if (addingLocations) {
      const coordinates = ev.lngLat;
      setMarkers(markers.concat({ id: new Date().getTime(), latitude: coordinates[1], longitude: coordinates[0], popup: false }));
    }
  };

  return (<div>
    <div style={{ position: 'absolute', top: 0, left: 0 }}>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapStyle={basemap}
        onNativeClick={handleOnClick}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        <Movement state={state} viewState={viewport} />
      </ReactMapGL>
    </div>
  </div>
  );
}
export default Map;