const SimpleRadioLabel = (props) => (
    <p
        {...props}
        style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            margin: 0,
            ...props.style
        }}
    >
        {props.value}
    </p>
)

export default SimpleRadioLabel