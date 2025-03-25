import Button from "@mui/material/Button";

function CustomBrownButton(props){
    const backColor = props.backgroundColor
    return(
        <Button
            variant="contained"
            component="a"
            onClick={props.onClick}
            href={props.href}
            sx={{
                backgroundColor: backColor ? backColor : '#694040',
                color:'#FFF',
                fontFamily:"Jost",
                fontWeight:'600',
                height:'50px',
                width:{xs:'100%', sm:'100%', md:'60%', lg:'50%', xl:'50%'},
                '&:hover': {
                    backgroundColor: '#9E6C6C',
                    borderColor: '#9E6C6C',
                    boxShadow: 'none',
                    color:'#FFF'
                },
            }}>
            {props.label}</Button>
    )
}

export default CustomBrownButton;