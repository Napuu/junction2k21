import React, {useState, useEffect} from 'react';
import { Button, Paper, Box } from '@material-ui/core';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import BasemapSelector from './BasemapSelector';
import { motion } from 'framer-motion';

function Controls({viewport, basemap, mapboxApiAccessToken, setBasemap, setAddingLocations, addingLocations}) {
  const [justLoaded, setJustLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setJustLoaded(true), 3000);
  }, []);
  return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: justLoaded > 0 ? 1 : 0 }}>
      <Box p={1} pb={0}>
        <Paper>
          <Box p={0.5} display="flex" flexDirection="column">
            <Button onClick={() => { setAddingLocations(p => !p); }}>
              <AddLocationAltIcon color={addingLocations ? "success" : "disabled"} />
            </Button>
          </Box >
        </Paper>
      </Box>
      <BasemapSelector
        viewport={viewport}
        basemap={basemap}
        mapboxApiAccessToken={mapboxApiAccessToken}
        setBasemap={setBasemap} />
  </motion.div >
  );
}

export default Controls;