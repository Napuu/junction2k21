import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import SimpleRadio from './SimpleRadio';
import { Tooltip } from '@material-ui/core';
import SimpleRadioLabel from './SimpleRadioLabel';
import infoIcon from '../assets/information.png';

const LevelPanel = ({transmissionPower, setTransmissionPower}) => (
    <Box
        sx={{
            bgcolor: '#1a1a1a',
            boxShadow: 1,
            borderRadius: '20px',
            p: '32px',
            minWidth: 300,
        }}
    >
        <Box sx={{ color: 'white' }}>
            Transmission power
        </Box>

        <FormControl margin='dense' fullWidth={true} component="fieldset">
            <RadioGroup defaultValue="level1" name="date-range-type-group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{
                        width: '100%', 
                        height: '24px', 
                        top: '5px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                        position: 'absolute',
                        borderRadius: '50px',
                    }}/>
                    <FormControlLabel
                        labelPlacement="bottom"
                        checked={transmissionPower === 1}
                        onClick={() => setTransmissionPower(1)}
                        value="level1"
                        control={<SimpleRadio style={{ paddingLeft: 0 }} />}
                        label={<span />}
                        style={{ marginLeft: 0 }}
                    />
                    <FormControlLabel
                        labelPlacement="bottom"
                        checked={transmissionPower === 2}
                        onClick={() => setTransmissionPower(2)}
                        value="level2"
                        control={<SimpleRadio />}
                        label={<span />}
                    />
                    <FormControlLabel
                        labelPlacement="bottom"
                        checked={transmissionPower === 3}
                        onClick={() => setTransmissionPower(3)}
                        value="level3"
                        control={<SimpleRadio style={{ paddingRight: 0 }}/>}
                        label={<span />}
                        style={{ marginRight: 0 }}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0px'}}>
                    <SimpleRadioLabel value="Level 1" style={{ width: '30%', textAlign: 'left' }} />
                    <SimpleRadioLabel value="Level 2" style={{ width: '30%', textAlign: 'center' }} />
                    <SimpleRadioLabel value="Level 3" style={{ width: '30%', textAlign: 'right' }} />
                </div>
                <FormControlLabel
                    labelPlacement="end"
                    value="blip"
                    checked={transmissionPower === 4}
                    onClick={() => setTransmissionPower(4)}
                    control={<SimpleRadio />}
                    label={<SimpleRadioLabel value={<>
                        {"BLIP™ Optimized"}
                        <Tooltip
                            title={"Perfect combination of power savings and customer happiness (animation frozen on purpose)"}
                        >
                        <img src={infoIcon} alt="info" width='20px' height='20px' style={{ marginLeft: '7px', marginBottom: '-5px' }} />
                        </Tooltip>
                    </>} />}
                />
            </RadioGroup>
        </FormControl>
    </Box>
)

export default LevelPanel;