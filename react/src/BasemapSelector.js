import { Button, Paper, Box } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from "./hooks";
import { useNavigate, useLocation } from "react-router-dom";

export const basemaps = [
  { title: "Streets", url: "mapbox://styles/mapbox/streets-v11", icon: "mapbox/streets-v11" },
  { title: "Satellite", url: "mapbox://styles/mapbox/satellite-v9", icon: "mapbox/satellite-v9" },
  { title: "Dark", url: "mapbox://styles/palikk/ckw20gafz6s7i14qe4z2qgsy9", icon: "palikk/ckw20gafz6s7i14qe4z2qgsy9" },
];

// No idea what is going on here.
// Trying to use named function breaks useRef.
// eslint-disable-next-line
export default function ({ setBasemap, viewport, mapboxApiAccessToken }) {

  const debouncedViewport = useDebounce(viewport, 1000);
  const basemapCanvasRefs = basemaps.map(basemap => useRef(null));

  const [justLoaded, setJustLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setJustLoaded(true), 3000);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!justLoaded) return;

    const setImage = async (index) => {
      const img = new Image();
      const basemap = basemaps[index];
      img.onload = () => {
        const canvas = basemapCanvasRefs[index].current;
        const ctx = canvas.getContext("2d");
        let i = 0;
        const test = () => {
          i += 0.01;
          ctx.globalAlpha = i;
          let drawableWidth = canvas.width;
          let drawableHeight = canvas.height;
          let x = 0, y = 0;
          if (img.height > img.width) {
            drawableHeight = drawableWidth / img.width * img.height;
            y = (canvas.height - drawableHeight) / 2;
          } else {
            drawableWidth = drawableHeight / img.height * img.width;
            x = (canvas.width - drawableWidth) / 2;
          }
          ctx.drawImage(img, x, y, drawableWidth, drawableHeight);
          if (i < 1) {
            requestAnimationFrame(test);
          }
        };
        requestAnimationFrame(test);
      };
      img.src = `https://api.mapbox.com/styles/v1/${basemap.icon}/static/${debouncedViewport.longitude},${debouncedViewport.latitude},${debouncedViewport.zoom}/${Math.min(debouncedViewport.width, 1280)}x${Math.min(debouncedViewport.height, 1280)}?access_token=${mapboxApiAccessToken}`;
    };
    Promise.all(basemaps.map((_, i) => {
      return setImage(i);
    }));
  }, [justLoaded, debouncedViewport, basemapCanvasRefs, mapboxApiAccessToken]);

  const location = useLocation();

  return (
    <Box p={1}>
      <Paper>
        <Box pt={0.5} pb={0.5} display="flex" flexDirection="column">
          {basemaps.map((basemap, i) => (
            <Button key={i} onClick={() => {
              setBasemap(basemap.url);
              const rest = location.pathname.split("/").slice(2).join("/");
              navigate(`/${basemap.title.toLowerCase()}/${rest}`);
            }}>
              <canvas style={{"border": "1px solid rgba(0, 0, 0, 0.5)", borderRadius: 5}} ref={basemapCanvasRefs[i]} width={50} height={50} />
            </Button>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
