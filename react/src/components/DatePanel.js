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
import InputAdornment from '@mui/material/InputAdornment';
import Icon from "@material-ui/core/Icon";
import CalendarToday from '@mui/icons-material/CalendarToday';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { flexbox } from '@mui/system';
const DatePanel = () => {
    const [value, setValue] = useState([new Date(), new Date()]);
    const theme = createTheme({
        components: {
            MuiIconButton: {
                styleOverrides: {
                    sizeMedium: {
                        color: 'white',
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        "&.MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                            opacity: "0%"
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                            opacity: "0%"
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                            opacity: "0%"
                        }
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: 'white',
                        opacity: "0%",
                        display: "none"
                    }
                }
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
            <Box sx={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                Selected date
            </Box>

            <FormControl component="fieldset">
                <RadioGroup defaultValue="single" name="date-range-type-group">
                    <FormControlLabel
                        value="single"
                        control={<SimpleRadio />}
                        label={<SimpleRadioLabel value="Single day" />}
                    />
                    <FormControlLabel
                        value="all"
                        control={<SimpleRadio />}
                        label={<SimpleRadioLabel value="All data" />}
                    />
                </RadioGroup>
            </FormControl>

            <div style={{ border: '5px solid white', borderRadius : '25px' }}>naurua
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Basic example"
                            value={value}
                            inputFormat="dd.MM"
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <input disabled={true} style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        outline: 'none',
                                        width: '42px',
                                    }} ref={inputRef} {...inputProps} />
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                        />
                    </LocalizationProvider>
                </ThemeProvider>
            </div>
        </Box>
    )
}

export default DatePanel;
