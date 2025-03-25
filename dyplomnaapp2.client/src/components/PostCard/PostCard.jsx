//import * as React from 'react';
//import { styled } from '@mui/material/styles';
//import Card from '@mui/material/Card';
//import CardHeader from '@mui/material/CardHeader';
//import CardMedia from '@mui/material/CardMedia';
//import CardContent from '@mui/material/CardContent';
//import CardActions from '@mui/material/CardActions';
//import Collapse from '@mui/material/Collapse';
//import Avatar from '@mui/material/Avatar';
//import IconButton, { IconButtonProps } from '@mui/material/IconButton';
//import Typography from '@mui/material/Typography';
//import { red } from '@mui/material/colors';
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//import FavoriteIcon from '@mui/icons-material/Favorite';
//import ShareIcon from '@mui/icons-material/Share';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import Content from "./ReadMoreContent";
//// import CommentIcon from '@mui/icons-material/Comment';
//// import CommentCard from "../CommentDir/CommentCard";
//import {List} from "@mui/material";
//// import CommentSection from "../CommentDir/CommentSection";
//import "../fonts.css"

////interface ExpandMoreProps extends IconButtonProps {
////    expand: boolean;
////}


////const ExpandMore = styled((props: ExpandMoreProps) => {
////    const { expand, ...other } = props;
////    return <IconButton {...other} />;
////})(({ theme, expand }) => ({

////    marginRight: 'auto',
////    transition: theme.transitions.create('transform', {
////        duration: theme.transitions.duration.shortest,
////    }),
////}));

//const PostCard = (props) => {
//    const [expanded, setExpanded] = React.useState(false);

//    const numberOfPhotos = props.numberOfPhotos
//    // const date = "September 6, 2023"

//    const handleExpandClick = () => {
//        setExpanded(!expanded);
//    };


//    return (
//        <Card
//            // width = "194"
//            // height = "194"
//            padding="2%"

//            sx={{
//                maxWidth: {xs: "80%", sm: "70%", md: "35%", lg: "35%", xl:"40%"},
//                // maxHeight: {xs: "90%", sm: "200%", md: "1000%", lg: "700%"},
//                borderRadius: "24px",
//                marginTop: "16px",
//                marginLeft: "auto",
//                marginRight: "auto",
//                fontFamily:"Jost, sans-serif"
//            }}>
//            <CardHeader
//                sx={{
//                    fontFamily:"Poppins",
//                    "& .MuiCardHeader-title":{
//                        fontFamily:"Jost, sans-serif"
//                    },
//                    "& .MuiCardHeader-subheader":{
//                        fontFamily:"Jost, sans-serif"
//                    }
//                }}

//                // title="Shrimp and Chorizo Paella"
//                // title={props.nickname}
//                subheader={props.date}
//                // subheader="202020"
//            />
//            {
//                numberOfPhotos >= 1 ?
//                    (
//                <CardMedia
//                component="img"
//                height="80%"
//                width="80%"
//                src={props.post_image}
//                // src={props.post_image}
//                alt="Paella dish"
//                />
//                ) : (<div/>)
//            }

//            <CardContent
//                sx = {{
//                    fontFamily:"Jost, sans-serif"
//                }}>
//                <Content post_text ={props.text}/>
//            </CardContent>
//        </Card>
//    );
//}
//export default  PostCard;