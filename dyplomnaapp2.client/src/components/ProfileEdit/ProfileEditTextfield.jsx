import {TextField} from "@mui/material";

function ProfileEditText(props){
    const handleChange2 = (event) => {
        const inputValue = event.target.value;
        // Validate if the input is an integer
        
        // Pass the value to the parent component
        if (props.onChange) {
            props.onChange(inputValue);
        }
    };

    return(
        <TextField
            id="outlined-flexible"
            label={props.label}
            placeholder={props.placeholder}
            multiline
            maxRows={props.maxRows}
            minRows={props.minRows}
            fullWidth
            type={props.type}
            //defaultValue={props.nameFromDB}
            inputProps={{
                maxLength: props.maxLength,
               }}
            value={props.value}
            onChange={handleChange2}
            sx={{
                fontFamily:"Jost",
                marginTop:"2%",
                color:"#FFF",
                borderColor:"#FFF",
                "& label": {
                    fontFamily:"Jost",
                    // marginTop:"2%",
                },
                '& .MuiInputBase-input': {
                    fontFamily: "Jost",
                    color:"#FFF",
                    borderColor:"#FFF",

                },
                '& .MuiOutlinedInput-root': {
                    borderColor:"#FFF",
                    '&:hover fieldset': {
                        borderColor: '#9E6C6C', // Border color when hovered
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#FFF', // Border color when focused
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#FFF', // Label color when focused
                },


            }}
        />
    )

}

export default ProfileEditText;