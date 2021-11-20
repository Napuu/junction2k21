import * as React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Box from '@mui/material/Box';
import sunIcon from '../assets/wi-day-sunny.svg';
import rainIcon from '../assets/wi-showers.svg';

const StatsPanel = () => {
  return (
    <Box
      sx={{
        bgcolor: '#1a1a1a',
        boxShadow: 1,
        borderRadius: '20px',
        p: '32px',
        minWidth: 300,
      }}
    >
      <Box sx={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
        Customer happiness
      </Box>
      <Box sx={{ color: 'white', fontSize: 48, fontWeight: 'bold', lineHeight: '60px', marginBottom: '20px' }}>
        80%
      </Box>

      <Box sx={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
        Power savings per hour
      </Box>
      <Box sx={{ color: 'white', fontSize: 48, fontWeight: 'bold', lineHeight: '60px', marginBottom: '5px' }}>
        500 kW
      </Box>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Box
          sx={{ width: "50px" }}
        >
          <img src={rainIcon} alt="rainIcon" />
        </Box>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <Box
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mx: 0.5,
            }}
          >
            -30 kW
          </Box>
          <Box sx={{ color: 'white', fontSize: 12, mx: 1, fontWeight: 'bold' }}>
            due to rain
          </Box>
        </div>
      </div>




    </Box>
  );
}


export default StatsPanel;