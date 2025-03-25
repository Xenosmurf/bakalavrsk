import {Card} from "reactstrap";
import {Avatar, CardActionArea, CardContent, CardMedia, Divider, Icon, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useLocation, useNavigate} from "react-router-dom";
import {advertisement_route} from "../Routing/Routes";
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';


export default function AdItem(props) {

    const adId = props.adId;
    const avatarURL = props.avatarURL;
    const payment = props.payment;
    const title = props.title;
    const username = props.username;
    const deadline = props.deadline;
    const expertId = props.expertId;
    const statusAd = props.statusAd;
    const onClick = props.onClick;
    

    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    //function openAd(adId) {
    //    navigate(advertisement_route + "/" + adId)
    //}

    const openAd = (adId) => {
        navigate(`/advertisement/${adId}`);
    };




    return(
        <>
            <Card padding="2%" sx={{ maxWidth: "100%", margin: '10%' }}>
                <CardActionArea onClick={() => openAd(adId)}>
                <CardContent
                sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>
                    <div
                        style={{
                            display:'flex',
                            alignItems:'center',
                        }}>
                        <Avatar
                                src={avatarURL}
                                alt={username}
                        sx={{
                            height:'50px',
                            width:'50px',
                        }}/>
                        <div
                        style={{
                            marginLeft:'16px'
                        }}>

                        <Typography gutterBottom variant="h5" component="div"
                                    sx={{
                            maxWidth:"60%",
                            fontFamily:'Jost, sans-serif'
                        }}>
                                    {title}
                        </Typography>
                            <div
                            style={{
                                display:'flex',
                            }}>
                                <Typography variant="body2" color="text.secondary"
                                            sx={{
                                                    fontFamily:'Jost, sans-serif'
                                        }}>
                                        {username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary"
                                            sx={{
                                                fontFamily:'Jost, sans-serif',
                                                marginLeft:'16px'
                                            }}>
                                        {deadline }
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div
                    style={{
                        display:'flex'
                    }}>
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}>
                        <Typography
                            variant='h5'
                            sx={{
                                    fontFamily: 'Jost, sans-serif',
                                fontWeight:'500'
                                    }}>
                                    {payment} грн
                        </Typography>
                        <Typography variant="body2" color="text.secondary"
                                    sx={{
                                        fontFamily:'Jost, sans-serif',
                                        marginLeft:'16px'
                                    }}>
                                    {statusAd}
                        </Typography>
                    </div>

                    </div>


                </CardContent>
                </CardActionArea>
                {currentPath.includes("edit") && expertId == null ?
                    (<IconButton
                        onClick={onClick}
                    sx={{
                        marginLeft: "20px"
                    }}>
                    <DeleteIcon/>
                </IconButton>) : (<div/>)
            }
        </Card>
        <Divider/>
        </>
    );
}

AdItem.propTypes = {
    adId: PropTypes.number.isRequired,
    payment: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    avatarURL: PropTypes.string,
    username: PropTypes.string.isRequired,
    statusAd: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    expertId: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

