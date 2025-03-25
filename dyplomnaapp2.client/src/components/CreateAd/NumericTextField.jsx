import { TextField } from "@mui/material";

function NumericTextfield(props) {
    const handleChange = (event) => {
        const inputValue = event.target.value;
        // Validate if the input is an integer
        if (!Number.isInteger(Number(inputValue))) {
            // If not an integer, prevent updating the state
            return;
        }
        // Pass the value to the parent component
        if (props.onChange) {
            props.onChange(inputValue);
        }
    };

    return (
        <TextField
            id="outlined-multiline-flexible"
            label={props.label}
            placeholder={props.placeholder}
            multiline={props.multiline}
            maxRows={props.maxRows}
            minRows={props.minRows}
            defaultValue={props.defaultValue}
            fullWidth
            type={props.type}
            inputProps={{
                maxLength: props.maxLength,
                // inputMode: "numeric",
            }}
            value={props.value}
            onChange={handleChange}
            sx={{
                fontFamily: "Jost",
                marginTop: props.marginTop,
                // paddingTop:"2%",
                "& label": {
                    fontFamily: "Jost",
                    // marginTop:"2%",

                },
                '& .MuiInputBase-input': {
                    fontFamily: "Jost",

                },
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: '#9E6C6C', // Border color when hovered
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#694040', // Border color when focused
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#694040', // Label color when focused
                },


            }}
        />
    )

}

export default NumericTextfield;