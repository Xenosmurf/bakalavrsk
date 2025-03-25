import { Card } from "reactstrap";
import { Avatar, CardActionArea, CardContent, CardMedia, Divider, Icon, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { advertisement_route } from "../Routing/Routes";
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewSection from "../Profile/ReviewSection";
import PropTypes from 'prop-types';


export default function ExpertItem(props) {

    const { userId, avatarURL, username, rating_expert, number_reviews_expert } = props

    //const userId = props.userId;
    //const avatarURL = props.avatarURL;
    //const username = props.username;
    //const rating_expert = props.rating_expert;
    //const number_reviews_expert = props.number_reviews_expert;
    //const onClick = props.onClick;


    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    //function openAd(adId) {
    //    navigate(advertisement_route + "/" + adId)
    //}

    const openProfile = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <>
            <Card padding="2%" sx={{ maxWidth: "100%", margin: '10%' }}>
                <CardActionArea onClick={() => openProfile(userId)}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection:'column',
                            //justifyContent: 'space-between'
                        }}>
                        
                        <Avatar
                            src={avatarURL}
                            alt={username}
                            sx={{
                                height: '50px',
                                width: '50px',
                            }} />
                          

                        <Typography gutterBottom variant="h5" component="div"
                            sx={{
                                maxWidth: "60%",
                                fontFamily: 'Jost, sans-serif'
                            }}>
                            {username}
                        </Typography>

                        {/*<ReviewSection color='#000' rating={rating_expert} number_reviews={number_reviews_expert} />*/}

                                



                    </CardContent>
                </CardActionArea>
                {/*{currentPath.includes("edit") ?*/}
                {/*    (<IconButton*/}
                {/*        onClick={onClick}*/}
                {/*        sx={{*/}
                {/*            marginLeft: "20px"*/}
                {/*        }}>*/}
                {/*        <DeleteIcon />*/}
                {/*    </IconButton>) : (<div />)*/}
                {/*}*/}
            </Card>
        </>
    );
}

ExpertItem.propTypes = {
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatarURL: PropTypes.string,
    rating_expert: PropTypes.number,
    number_reviews_expert: PropTypes.number,
};

