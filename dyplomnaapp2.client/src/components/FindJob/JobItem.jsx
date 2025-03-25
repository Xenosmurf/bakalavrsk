import { Card } from "reactstrap";
import { Avatar, CardActionArea, CardContent, CardMedia, Divider, Icon, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { advertisement_route } from "../Routing/Routes";
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewSection from "../Profile/ReviewSection";
import PropTypes from 'prop-types';


export default function JobItem(props) {

    const { adId, title, payment, deadline, createdAt, authorUsername, authorAvatarURL } = props
    //const { adId, title, descriptionAd, payment, createdAt, deadline, statusAd, expertId, categoryId, authorUsername, authorAvatarURL } = props


    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    //function openAd(adId) {
    //    navigate(advertisement_route + "/" + adId)
    //}

    const openAd = (adId) => {
        navigate(`/advertisement/${adId}`);
    };

    return (
        <>
            <Card padding="2%" sx={{ maxWidth: "100%", margin: '10%' }}>
                <CardActionArea onClick={() => openAd(adId)}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <Avatar
                                src={authorAvatarURL}
                                alt={authorUsername}
                                sx={{
                                    height: '50px',
                                    width: '50px',
                                }} />
                            <div
                                style={{
                                    marginLeft: '16px'
                                }}>

                                <Typography gutterBottom variant="h5" component="div"
                                    sx={{
                                        maxWidth: "60%",
                                        fontFamily: 'Jost, sans-serif'
                                    }}>
                                    {title}
                                </Typography>
                                <div
                                    style={{
                                        display: 'flex',
                                    }}>
                                    <Typography variant="body2" color="text.secondary"
                                        sx={{
                                            fontFamily: 'Jost, sans-serif'
                                        }}>
                                        {authorUsername}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary"
                                        sx={{
                                            fontFamily: 'Jost, sans-serif',
                                            marginLeft: '16px'
                                        }}>
                                        {(createdAt.split("T")[0])}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex'
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
                                        fontWeight: '500'
                                    }}>
                                    {payment} грн
                                </Typography>
                               
                            </div>

                        </div>


                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}


JobItem.propTypes = {
    adId: PropTypes.number.isRequired,
    title: PropTypes.string,
    descriptionAd: PropTypes.string,
    payment: PropTypes.number,
    createdAt: PropTypes.string,
    deadline: PropTypes.string,
    statusAd: PropTypes.string,
    expertId: PropTypes.string,
    categoryId: PropTypes.string,
    authorUsername: PropTypes.string,
    authorAvatarURL: PropTypes.string,
};

