import StarIcon from '@mui/icons-material/Star';
import {Card} from "reactstrap";
import {Avatar, CardContent, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import StarsComponent from "./StarsComponent";
import {useNavigate} from "react-router-dom";
import {advertisement_route, profile_route, signup_route} from "../Routing/Routes";
import LinkTypography from "./LinkTypography";
import ArticleIcon from '@mui/icons-material/Article';
import GoToAdBtn from "./GoToAdBtn";
import PropTypes from 'prop-types';


function Review(props){

    const navigate = useNavigate()
    const {createdAt, reviewText, rating, adId, authorId, username} = props


    //const handleClick = (e) => {
    //    e.preventDefault()
    //    // localStorage.clear();
    //    navigate(profile_route)
    //}

    const openProfile = (authorId) => {
        navigate(`/profile/${authorId}`);
    }

    const openAd = (adId) => {
        navigate(`/advertisement/${adId}`);
    };

    
    return(
        <>
            <Card padding="2%" sx={{ maxWidth: 345, margin:'10%'}}>
                    <CardContent
                        sx={{
                            // display:'flex',
                            // alignItems:'center',
                        }}>
                        <div
                        style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between"
                        }}>
                        <StarsComponent number={rating} />
                            <Typography
                            sx={{
                                fontFamily:"Jost",
                                fontWeight:"300",
                                color:"#000000"
                            }}>
                            {createdAt }
                            </Typography>
                        </div>

                        <div
                        style={{
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between"
                        }}>
                            <div>
                                <Typography sx={{
                                    fontFamily:"Jost",
                                    fontWeight:"400",
                                    fontSize: {xs:"20px", sm:"20px", md:"20px", lg:"25px", xl:"25px"}
                            }}>
                                {reviewText }
                            </Typography>
                            <LinkTypography onClick={() => openProfile(authorId)}>{username}</LinkTypography>
                        </div>
                        <GoToAdBtn onClick={() => openAd(adId)} />
                        </div>



                    </CardContent>
            </Card>
            <Divider/>
        </>
    );
}

 

Review.propTypes = {
    reviewId: PropTypes.string,
    createdAt: PropTypes.string,
    reviewText: PropTypes.string,
    rating: PropTypes.number.isRequired,
    adId: PropTypes.number.isRequired,
    authorId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};

export default Review;