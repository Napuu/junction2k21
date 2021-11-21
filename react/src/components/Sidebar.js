import React from 'react';

import SidebarHeader from './SidebarHeader'
import StatsPanel from './StatsPanel'
import DatePanel from './DatePanel'
import LevelPanel from './LevelPanel'
import Stack from '@mui/material/Stack';


const Sidebar = ({state, setState}) => (
    <Stack
        direction="column"
        spacing='20px'
    >
        <SidebarHeader />
        <StatsPanel transmissionPower={state.transmissionPower} dateValue={state.dateValue} />
        <DatePanel dateValue={state.dateValue} setDateValue={(date) => {
            setState({...state, dateValue: date});
        }} />
        <LevelPanel transmissionPower={state.transmissionPower} setTransmissionPower={(transmissionPower) => {
            setState({...state, transmissionPower});
        }} />
    </Stack>
)

export default Sidebar;