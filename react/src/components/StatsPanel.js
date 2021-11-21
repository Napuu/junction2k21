import React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import sunIcon from '../assets/wi-day-sunny.svg';
import rainIcon from '../assets/wi-showers.svg';
import infoIcon from '../assets/information.png';
import conditions from "../conditions.json";
const infoBox = `Calculated using proprietary BLIP™ algorithm.`

const StatsPanel = ({ transmissionPower, dateValue }) => {
  const calculateHappiness = () => {
    if (transmissionPower === 1) return ("-1%")
    if (transmissionPower === 2) return ("80%")
    if (transmissionPower === 3) return ("90%")

  }

  const calculateWatt = () => {
    if (transmissionPower === 1) return (927)
    if (transmissionPower === 2) return (521)
    if (transmissionPower === 3) return (0)
  }

  const dateValueDay = dateValue.toISOString().split("T")[0];
  const saving = 800;
  const weatherLoss = (conditions[dateValueDay].vis * saving + conditions[dateValueDay].temp * saving).toFixed(2)
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
        {calculateHappiness().toString()}
      </Box>

      <Box sx={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
        Power savings per hour
      </Box>
      <Box sx={{ color: 'white', fontSize: 48, fontWeight: 'bold', lineHeight: '60px', marginBottom: '5px' }}>
        {calculateWatt() - weatherLoss} kW
      </Box >

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
              fontSize: '24px',
              fontWeight: 'bold',
              lineHeight: '25px',
              mx: 0.5,
            }}
          >
            -{weatherLoss} kW
          </Box>
          <Box sx={{ color: 'white', fontSize: 12, mx: 1, fontWeight: 'bold' }}>
            due to weather
          </Box>
        </div>
        <Tooltip
          title={infoBox}
        >
          <img src={infoIcon} alt="info" width='20px' height='20px' style={{ marginLeft: '12px', marginTop: '17px' }} />
        </Tooltip>
      </div>
    </Box >
  );
}


export default StatsPanel;