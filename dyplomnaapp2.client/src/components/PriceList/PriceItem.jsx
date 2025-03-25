import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material";
import PropTypes from 'prop-types';


function PriceItem(props){

    const name = props.name;
    const payment = props.payment;

    const lineStyle = {

        borderBottom: '1px solid ', // You can adjust the color and style as needed
        // margin: '0',
        width: '100%', // Adjust the width of the line
        color:alpha('#694040', 0.3)
        // padding:'3%'
    };

    return(
        <div
            style={{
                display:"flex",
                alignItems:"flex-end",
                // justifyContent:"space-between",
                padding:'2%'
            }}>
            <Typography
                sx={{
                    fontFamily:"Jost",
                    fontWeight:"400",
                }}
            >
                {name}
                {/*In hendrerit, nunc sit amet tempus efficitur, mauris dolor facilisis lacus, sed lacinia ex ligula pretium lectus. Nullam non sem nisi.*/}
            </Typography>
            <div style={lineStyle}></div>
            <Typography
                sx={{
                    fontFamily:"Jost",
                    fontWeight:"400",
                    whiteSpace: 'nowrap'
                }}>
                {payment} грн
            </Typography>
        </div>
    );
}

PriceItem.propTypes = {
        name: PropTypes.string.isRequired,
        payment: PropTypes.string.isRequired
};

export default PriceItem