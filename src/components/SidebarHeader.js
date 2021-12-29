import Stack from '@mui/material/Stack';

import lightningIcon from '../assets/Lightning.png';

const SidebarHeader = () => (
    <Stack
        direction="row"
        spacing='10px'
        justifyContent='flex-end'
    >
        <p style={{margin: 0, color: 'white', fontSize: '36px', fontWeight: 'bold'}}>BLIP</p>
        <img src={lightningIcon} alt="lightningIcon" height='36px' style={{ marginTop: '5px' }} />
    </Stack>
)

export default SidebarHeader