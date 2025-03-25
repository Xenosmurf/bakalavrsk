import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
//import CardActions from '@mui/material/CardActions';
//import Collapse from '@mui/material/Collapse';
//import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Content from "./ReadMoreContent";
import {List} from "@mui/material";
import "../fonts.css"
import {useState} from "react";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';




const PostCardManyPhotos = ({onDelete, ...props }) => {
    const [expanded, setExpanded] = React.useState(false);

    const { date } = props
    //const parts = portfolioImageUrl.split("/");

    //// Get the last part of the URL (which should be the filename)
    //const filename = parts[parts.length - 1];

    const parts = date.split("T");
    const createdAt = parts[0];


    const numberOfPhotos = props.numberOfPhotos
    const images = props.images

    const location = useLocation();
    const currentPath = location.pathname;


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // function MediaCarousel({ images }) {
        const [currentIndex, setCurrentIndex] = useState(0);

        const handleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    {/*subheader={props.date}*/ }
    return (
        <Card
            // width = "194"
            // height = "194"
            padding="2%"

            sx={{
                maxWidth: {xs: "80%", sm: "70%", md: "35%", lg: "35%", xl:"40%"},
                // maxHeight: {xs: "90%", sm: "200%", md: "1000%", lg: "700%"},
                borderRadius: "24px",
                marginTop: "16px",
                marginLeft: "auto",
                marginRight: "auto",
                fontFamily:"Jost, sans-serif"
            }}>
            <CardHeader
                sx={{
                    fontFamily:"Poppins",
                    "& .MuiCardHeader-title":{
                        fontFamily:"Jost, sans-serif"
                    },
                    "& .MuiCardHeader-subheader":{
                        fontFamily:"Jost, sans-serif"
                    }
                }}
                subheader={createdAt}
               
                action={
                    currentPath.includes("edit") ? (
                        <IconButton
                        onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>) : ('')

                }
            />
            {
                numberOfPhotos >= 1 ?
                    (
                        <div>
                            <List sx={{
                                // display: "flex",
                                // overflowX: "auto"
                            }}>
                                {images.map((image, index) => (
                                    <div key={index} style={{ minWidth: "80%" }}>
                                        {index === currentIndex && (
                                            <CardMedia
                                                component="img"
                                                height="80%"
                                                width="80%"
                                                src={image.postImageUrl}
                                                alt="Image"
                                                style={{ margin: "auto" }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </List>
                            <div style={{ textAlign: "center" }}>
                                <Button onClick={handlePrev} disabled={currentIndex === 0}>
                                    Previous
                                </Button>
                                <Button onClick={handleNext} disabled={currentIndex === images.length - 1}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    ) : (<div/>)
            }

            <CardContent
                sx = {{
                    fontFamily:"Jost, sans-serif"
                }}>
                <Content post_text ={props.text}/>
            </CardContent>
        </Card>
    );
}

PostCardManyPhotos.propTypes = {
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    numberOfPhotos: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    //children: PropTypes.node,
    images: PropTypes.arrayOf(PropTypes.shape({
        postImageUrl: PropTypes.string.isRequired,
    
    }))
};
export default  PostCardManyPhotos;