import React from 'react';

import SidebarHeader from './SidebarHeader'
import StatsPanel from './StatsPanel'
import DatePanel from './DatePanel'
import LevelPanel from './LevelPanel'
import Stack from '@mui/material/Stack';
import TestBox from './TestBox'


const Sidebar = () => (
    <Stack
        direction="column"
        spacing='20px'
    >
        <SidebarHeader />
        <StatsPanel />
        <DatePanel />
        <LevelPanel />
    </Stack>
)

export default Sidebar;