import React, {useState, useEffect} from 'react';
import BasemapSelector from './BasemapSelector';
import { motion } from 'framer-motion';

function Controls({viewport, basemap, mapboxApiAccessToken, setBasemap}) {
  const [justLoaded, setJustLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setJustLoaded(true), 3000);
  }, []);
  return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: justLoaded > 0 ? 1 : 0 }}>
      <BasemapSelector
        viewport={viewport}
        basemap={basemap}
        mapboxApiAccessToken={mapboxApiAccessToken}
        setBasemap={setBasemap} />
  </motion.div >
  );
}

export default Controls;