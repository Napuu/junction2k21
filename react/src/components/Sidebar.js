import React from 'react';

import SidebarHeader from './SidebarHeader'
import StatsPanel from './StatsPanel'
import DatePanel from './DatePanel'
import LevelPanel from './LevelPanel'
import Stack from '@mui/material/Stack';


const Sidebar = ({dateValue, setDateValue}) => (
    <Stack
        direction="column"
        spacing='20px'
    >
        <SidebarHeader />
        <StatsPanel />
        <DatePanel dateValue={dateValue} setDateValue={setDateValue} />
        <LevelPanel />
    </Stack>
)

export default Sidebar;