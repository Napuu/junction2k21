
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';

const DatePicker = () => {
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
    return (<div style={{ display: 'flex', alignSelf: 'end', border: '2px solid white', borderRadius: '8px', width: '108px' }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: '8px', paddingLeft: '8px' }}>
                            <input disabled={true} style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                outline: 'none',
                                width: '80%',
                                height: '32px',

                            }} ref={inputRef} {...inputProps} />
                            {InputProps?.endAdornment}
                        </Box>
                    )}
                />
            </LocalizationProvider>
        </ThemeProvider>
    </div>)
}

export default DatePicker