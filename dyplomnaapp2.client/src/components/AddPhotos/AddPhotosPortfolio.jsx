import { Card } from "reactstrap";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import UploadPhotoPortfolio from "./UploadPhotoPortfolio";
import { useEffect, useState } from "react";
import { Grid, IconButton, List } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const generateTempKey = () => `${Date.now()}-${Math.random()}`;

function AddPhotosPortfolio(props) {
    const { userId } = props
    const [imagesFromDb, setImagesFromDb] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [imageURL, setImageURL] = useState("");

    const getPortfolio = async () => {
        try {
            const response = await fetch(`/portfolio/${userId}`);
            console.log("AddPhotos:", userId)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setImagesFromDb(data);
            setLoading(false); // Assuming successful response means user is authenticated
        } catch (error) {
            console.error('There was a problem with the fetch getPortfolio:', error);
        }
    };
    useEffect(() => {
        //const getPortfolio = async () => {
        //    try {
        //        const response = await fetch(`/portfolio/${userId}`);
        //        console.log("AddPhotos:", userId)
        //        if (!response.ok) {
        //            throw new Error('Network response was not ok');
        //        }

        //        const data = await response.json();
        //        console.log(data);
        //        setImagesFromDb(data);
        //        setLoading(false); // Assuming successful response means user is authenticated
        //    } catch (error) {
        //        console.error('There was a problem with the fetch getPortfolio:', error);
        //    }
        //};

        getPortfolio();
    }, [userId]);

    const location = useLocation();
    const currentPath = location.pathname;

    const isCreateAd = currentPath.includes("create-ad");
    const isCreatePost = currentPath.includes("create-post");


    const refreshUiOnUpload = (imageUrl, userId) => {
        //const image = {
        //    portfolioImageId: generateTempKey(),
        //    portfolioImageUrl: imageUrl,
        //    userPortfolioId: userId
        //}
        //setImagesFromDb(prevImages => [...prevImages, image])
        getPortfolio()
    }

    const addToDb = async (imageUrl) => {

        const url = "/portfolio/create";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "portfolioImageUrl": imageUrl,
                    "userPortfolioId": userId
                })
            });

            if (!response.ok) {
                throw new Error("Failed to create portfolio image");
            }
            refreshUiOnUpload(imageUrl, userId);

            console.log("Portfolio image created successfully");
            // Handle success (e.g., show a success message, clear form)
        } catch (error) {
            console.error("Error creating portfolio image:", error);
            // Handle error (e.g., show an error message)
        }
    };

    const getFileUrl = async (filename) => {
        const blobUrlEndpoint = `/image/bloburl?name=${encodeURIComponent('portfolio'+userId + filename)}`;

        try {
            const blobResponse = await fetch(blobUrlEndpoint);

            if (!blobResponse.ok) {
                throw new Error("Failed to fetch blob URL");
            }

            const blobResponseData = await blobResponse.json();
            console.log("Blob URL response data:", blobResponseData);

            // Assuming the response contains the URL of the blob
            //setImageURL(blobResponseData.url);
            addToDb(blobResponseData.url);
            console.log("IMAGE URL AFTER SET.........", blobResponseData.url);
        } catch (error) {
            console.error("Error fetching blob URL:", error);
            // Handle error
        }
    }

    const handleUpload = async (formData) => {
        const url = `/image/one?prefix=portfolio${userId}`;

        const file = formData.get('image'); // Assuming 'image' is the key used in formData.append

        if (file) {
            console.log("File name:", file.name);
        } else {
            console.log("No file found in formData");
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }
            const responseData = await response.json();
            getFileUrl(file.name);
            //addToDb(imageURL);
            //console.log("IMAGE URL: ", imageURL);
            //console.log(responseData);
            //console.log(formData);
            // Handle successful upload response
        } catch (error) {
            console.error("Error uploading image:", error);
            // Handle error
        }
    };




    //const deleteItem = (index) => {
    //    console.log("Deleting item at index:", index);
    //    setLoading(true);
    //    setInitialPricesFromDB(prevItems => {
    //        console.log("Previous items:", prevItems);
    //        // Create a copy of the array
    //        const newItems = [...prevItems];
    //        // Remove the item at the specified index
    //        newItems.splice(index, 1);
    //        console.log("New items:", newItems);
    //        setLoading(false)
    //        return newItems;
    //    });

    //    setPriceItems(prevItems => {
    //        const updatedItems = [...prevItems];
    //        updatedItems.splice(index, 1);

    //        return updatedItems;
    //    });
    //};

    const deleteImageFromDb = async (portfolioImageId, portfolioImageUrl, index) => {
        console.log("On db:", portfolioImageId)
        const url = `/portfolio/${portfolioImageId}`;

        try {
            const response = await fetch(url, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete portfolio image");
            }
            //const url = "https://dyplomnastorage.blob.core.windows.net/images/Screenshot 2024-02-25 154115.png";

            // Split the URL by "/"
            const parts = portfolioImageUrl.split("/");

            // Get the last part of the URL (which should be the filename)
            const filename = parts[parts.length - 1];
            deleteBlob(filename);
            deleteItem(index);

            console.log("Portfolio image deleted successfully");
            // Handle success (e.g., show a success message)
        } catch (error) {
            console.error("Error deleting portfolio image:", error);
            // Handle error (e.g., show an error message)
        }
    }

    const deleteBlob = async (name) => {
        console.log("BLOB NAME TO DELETE: ", name);
        const url = `/image?name=${encodeURIComponent(name)}`;

        try {
            const response = await fetch(url, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete blob");
            }

            const responseData = await response.json();
            console.log(responseData.message);
            // Handle success (e.g., show a success message)
        } catch (error) {
            console.error("Error deleting blob:", error);
            // Handle error (e.g., show an error message)
        }
    }

    const deleteItem = async (index) => {
        setLoading(true);
        refreshUiOnUpload();
        //setImagesFromDb(prevItems => {
        //        //console.log("Previous items:", prevItems);
        //        // Create a copy of the array
        //        const newItems = [...prevItems];
        //        // Remove the item at the specified index
        //        newItems.splice(index, 1);
        //        console.log("New items:", newItems);
        //        setLoading(false)
        //        return newItems;
        //    });
    }





    if (loading) {
        return (
            <div>LOADING...</div>
        )
    }
    return (
        <>
            <CardActions
                sx={{
                    justifyContent: "space-between"
                }}>
                {/* Render the custom button for uploading photos */}
                <UploadPhotoPortfolio onUpload={handleUpload} disabledButton={imagesFromDb.length >= 10} />

                {/*<CustomBrownButton label="Save" />*/}
                
            </CardActions>
            <Grid container>
                {/*onClick={() => handleDeleteImage(index)}*/}

                {imagesFromDb.map((image, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={generateTempKey()}>
                        <Card sx={{ position: "relative" }}>
                            {/*const deleteImageFromDb = async (portfolioImageId,  portfolioImageUrl, index) => {*/}

                            <IconButton
                                onClick={() => deleteImageFromDb(image.portfolioImageId, image.portfolioImageUrl, index)}
                                sx={{
                                    position: "absolute", color: '#694040', backgroundColor: "#FFF",
                                    '&:hover': {
                                        backgroundColor: '#E0CECE'
                                    }
                                }}>
                                <DeleteIcon />
                            </IconButton>
                            <CardMedia
                                component="img"
                                height={{ xs: "80px", sm: "90px", md: "100px", lg: "120px", xl: "120px" }}
                                width={{ xs: "80px", sm: "90px", md: "100px", lg: "120px", xl: "120px" }}
                                src={image.portfolioImageUrl}
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
            </div>
        </>
    );
}

AddPhotosPortfolio.propTypes = {
    userId: PropTypes.string.isRequired,
    children: PropTypes.node,
    //priceList: PropTypes.arrayOf(PropTypes.shape({
    //    priceItemId: PropTypes.number.isRequired,
    //    priceName: PropTypes.string.isRequired,
    //    payment: PropTypes.number.isRequired,
    //    userId: PropTypes.string.isRequired
    //})).isRequired
};

export default AddPhotosPortfolio;