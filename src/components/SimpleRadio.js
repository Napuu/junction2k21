import Radio from '@mui/material/Radio';

const SimpleRadio = (props) => (
    <Radio
        {...props}
        sx={{
            color: 'white',
            '&.Mui-checked': {
                color: 'white'
            },
            marginTop: "-4px",
            marginBottom: "-4px"
        }}
    />
)

export default SimpleRadio