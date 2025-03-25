import {Box, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";

function ReviewSection(props){
    const color = props.color
    const textSize = '1.2em'
    const numberSize = '1.2em'
    const rating = props.rating
    const number_reviews = props.number_reviews
    const role = props.role
    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: 'wrap',
            marginRight: '10px',
            marginLeft: '10px',
        }}>
            <Typography
                variant="h6"
                sx={{

                    fontFamily:'Jost',
                    // fontWeight:'200',
                    // fontSize: {textSize},
                    // fontSize:'20px',
                    color:{color},
                    fontStyle:"italic",
                }}>
                {role}
            </Typography>
        <div
        style={{
            display:'flex',
            alignItems:'center',
            flexDirection:'row',
        }}>
            <div style={{
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
            }}>
            <Typography
                variant="h5"
                sx={{
                    fontFamily:'Jost',
                    fontWeight:'600',
                    // fontSize:{numberSize},
                    color:{color}
                }}
                    >
                        {number_reviews}
                    </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily:'Jost',
                        fontWeight:'100px',
                        // fontSize: {textSize},
                        // fontSize:'20px',
                        color:{color}
                    }}>
                    відгуків
                </Typography>
            </div>
            <Divider color={color} orientation="vertical" variant="middle" flexItem sx={{
                padding:'1px',
                marginRight:"2%",
                marginLeft:"2%",
            }}/>
            <div style={{
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
            }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily:'Jost',
                        fontWeight:'600',
                        // fontSize:{numberSize},
                        color:{color}
                    }}
                    >
                        {rating}
                    </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily:'Jost',
                        fontWeight:'100px',
                        // fontSize: {textSize},
                        // fontSize:'20px',
                        color:{color}
                    }}>
                    оцінка
                </Typography>
            </div>

        </div>

        </div>
    );
}

export default ReviewSection;