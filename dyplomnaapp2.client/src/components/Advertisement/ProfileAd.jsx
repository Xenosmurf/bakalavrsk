import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ReviewSection from "../Profile/ReviewSection";
import PropTypes from 'prop-types';
import { Card } from "reactstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { CardActionArea, CardContent, CardMedia, Divider, Icon, IconButton } from "@mui/material";

import { profile_route } from "../Routing/Routes";



function ProfileAd(props) {
    const name = props.name;
    const avatarUrl = props.avatarUrl;
    const rating = props.rating;
    const number_review = props.number_review;
    const userId = props.userId

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(profile_route + "/" + userId)
    }

    return(
        <Card
            padding="2%" sx={{ maxWidth: "100%", margin: '10%' }}
        
        >
            <CardActionArea onClick={() => handleClick()}>
                <CardContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // padding:'2%'
                    }}
                >
            <div
            style={{
                display:'flex',
                alignItems:'flex-start'
            }}>
                <Avatar
                    src={avatarUrl ? avatarUrl : 'null'}
                    alt={name}
            sx={{
                height:'100px',
                width:'100px',
                marginRight:'5%'
            }}/>

            <Typography
            sx={{
                fontFamily:'Jost, sans-serif',
                fontSize:'30px',
                padding:'10%',

            }}>{name}</Typography>
            </div>
                    {/*<ReviewSection color='#000000' role="Замовник" rating={rating} number_reviews={number_review} />*/}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

ProfileAd.propTypes = {
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    rating: PropTypes.number,
    number_review: PropTypes.number,
    userId: PropTypes.string,
};

export default ProfileAd;