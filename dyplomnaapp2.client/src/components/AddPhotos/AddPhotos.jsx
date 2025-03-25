import {Card} from "reactstrap";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import AddPhotoBtn from "./AddPhotoBtn";
import { useState, useEffect } from "react";
import {Grid, IconButton, List} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';



function AddPhotos(props){

    const { userId, onImagesChange, onDelete } = props;
    //console.log(userId)
    //const imagesFromDB = [
    //    "https://www.petlandtexas.com/wp-content/uploads/2016/08/Red_Bunny_Petland_Puppy.jpg",
    //    "https://t4.ftcdn.net/jpg/04/02/26/11/360_F_402261107_D204pzlyN46dj5rBIgdXThFL74YQUWeY.jpg"
    //];

    const location = useLocation();
    const currentPath = location.pathname;

    const isCreateAd = currentPath.includes("create-ad");
    const isCreatePost = currentPath.includes("create-post");

    //console.log(isCreatePost);
    const [images, setImages] = useState([]);

    useEffect(() => {
        onImagesChange(images);
    }, [images, onImagesChange]);

    const handleFilesChange = (files) => {
        // Limit to 10 images
        const newImages = Array.from(files).slice(0, 10);
        setImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            //console.log("UPDATED IMAGES:", updatedImages); // Log the updated images array
            return updatedImages;
        });
    };

    //console.log("IMAGES ARRAY:", images);
    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };


    return (
        <>
            <CardActions
            sx={{
                justifyContent:"space-between"
            }}>
                {/* Render the custom button for uploading photos */}
                <AddPhotoBtn onFilesChange={handleFilesChange} disabledButton={images.length >= 10}/>
                {currentPath.includes("edit") ? (
                    <CustomBrownButton label="Зберегти"/>
                ) : (<div/>)}
            </CardActions>
            <Grid container>
                {images.map((image, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={index}>
                    <Card  sx={{ position: "relative" }}>
                        <IconButton
                            onClick={() => handleDeleteImage(index)}
                            sx={{ position: "absolute", color:'#694040', backgroundColor:"#FFF",
                            '&:hover':{
                                backgroundColor:'#E0CECE'
                            }}}>
                            <DeleteIcon/>
                        </IconButton>
                        <CardMedia
                            component="img"
                            height={{xs: "80px", sm: "90px", md: "100px", lg:"120px", xl:"120px"}}
                            width={{xs: "80px", sm: "90px", md: "100px", lg:"120px", xl:"120px"}}
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index + 1}`}
                            sx={{ margin: "auto", objectFit: "contain" }}
                        />

                    </Card>
                    </Grid>

                ))}
            </Grid>
            <div
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                {/*{children}*/}
            </div>
        </>
    );
}

AddPhotos.propTypes = {
    userId: PropTypes.string,
    children: PropTypes.node,
    onImagesChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    //priceList: PropTypes.arrayOf(PropTypes.shape({
    //    priceItemId: PropTypes.number.isRequired,
    //    priceName: PropTypes.string.isRequired,
    //    payment: PropTypes.number.isRequired,
    //    userId: PropTypes.string.isRequired
    //})).isRequired
};

export default AddPhotos;