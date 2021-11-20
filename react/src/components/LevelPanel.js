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
import SimpleRadioLabel from './SimpleRadioLabel';

const LevelPanel = () => (
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
            <RadioGroup defaultValue="single" name="date-range-type-group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormControlLabel
                        labelPlacement="bottom"
                        value="level1"
                        control={<SimpleRadio style={{ paddingLeft: 0 }} />}
                        label={<span />}
                        style={{ marginLeft: 0 }}
                    />
                    <FormControlLabel
                        labelPlacement="bottom"
                        value="level2"
                        control={<SimpleRadio />}
                        label={<span />}
                    />
                    <FormControlLabel
                        labelPlacement="bottom"
                        value="level3"
                        control={<SimpleRadio style={{ paddingRight: 0 }}/>}
                        label={<span />}
                        style={{ marginRight: 0 }}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <SimpleRadioLabel value="Left" style={{width: '30%'}} />
                    <SimpleRadioLabel value="Middle" style={{width: '30%'}} />
                    <SimpleRadioLabel value="Right" style={{width: '30%'}} />
                </div>
                <FormControlLabel
                    labelPlacement="end"
                    value="blip"
                    control={<SimpleRadio />}
                    label={<SimpleRadioLabel value="BLIP™ Optimized" />}
                />
            </RadioGroup>
        </FormControl>
    </Box>
)

export default LevelPanel;