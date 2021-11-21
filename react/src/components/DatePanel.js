import React, { useState } from 'react';

import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import SimpleRadio from './SimpleRadio';
import SimpleRadioLabel from './SimpleRadioLabel';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DatePicker from './DatePicker'
const DatePanel = ({dateValue, setDateValue}) => {
    const theme = createTheme({
        typography: {
            body1: {
                width: '100%'
            }
        }
    });
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
            <Box sx={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginBottom: '10px' }}>
                Selected date
            </Box>

            <FormControl fullWidth={true} component="fieldset" style={{ marginBottom: '10px' }}>
                <RadioGroup defaultValue="single" name="date-range-type-group">
                    <ThemeProvider theme={theme}>
                        <FormControlLabel
                            value="single"
                            checked={true}
                            control={<SimpleRadio />}
                            label={
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <SimpleRadioLabel value="Single day" />
                                    <DatePicker value={dateValue} setValue={setDateValue} />
                                </div>
                            }
                        />
                    </ThemeProvider>
                    <FormControlLabel
                        value="all"
                        checked={false}
                        control={<SimpleRadio />}
                        label={<SimpleRadioLabel value="All data (soon™)" />}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export default DatePanel;
