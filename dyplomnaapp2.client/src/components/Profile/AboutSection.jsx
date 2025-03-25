import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import "../fonts.css";
import PropTypes from 'prop-types';

function AboutSelf(props) {
    const { description } = props;

    return (
        description.length ? (
       
        <Box>
        <Typography
        sx={{
            fontFamily:'Jost',
            fontWeight:'800',
            fontSize:'28px',
            color:'#694040'
            // fontStyle:'bold'
        }}>
            про себе:
        </Typography>
            <Typography
                sx={{
                    fontFamily:'Jost',
                    fontSize:'20px',
                    color:'#694040'
                    // fontStyle:'bold'
                }}>
                {description}
            </Typography>
        </Box >
        
      ) : (<></>)
    );
}

AboutSelf.propTypes = {
    description: PropTypes.string,
    length: PropTypes.number,
};

export default AboutSelf;