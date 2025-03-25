import { useState } from "react";
import {Card, CardMedia, Grid, ImageList, ImageListItem} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageListSm from "./ImageListSm";
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";


function Portfolio(props) {
    const location = useLocation();
    const currentPath = location.pathname;

    //var isProfile = currentPath.includes("profile")
    //console.log("IS THIS PROFILE:", isProfile)

    var itemData = [];

    const isProfile = props.isProfile;

    if (isProfile) {
        itemData = props.portfolioImages;
    }
    else {
        itemData = props.adImages;
    }



    const [selectedImage, setSelectedImage] = useState("");

    const handleClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isMd = useMediaQuery(theme.breakpoints.only("md"));
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));
    const isXl = useMediaQuery(theme.breakpoints.only("xl"));

    const isWideScreen = useMediaQuery("(min-width:1000px)");


    let cols = 2; // Default number of columns
    let rowHeight = 164;

    // xs (extra small): Screen widths less than 600px.
    // sm (small): Screen widths greater than or equal to 600px.
    // md (medium): Screen widths greater than or equal to 960px.
    // lg (large): Screen widths greater than or equal to 1280px.
    // xl (extra large): Screen widths greater than or equal to 1920px.

    if (isXs) {
        cols = 1; // Set number of columns to 1 for xs screens
        rowHeight = 500;
    } else if (isSm) {
        cols = 1; // Set number of columns to 2 for sm screens
        rowHeight = 500;
    } else if (isMd) {
        cols = 2; // Set number of columns to 2 for sm screens
        rowHeight = 300;
    } else if (isLg) {
        cols = 3; // Set number of columns to 3 for lg screens
        rowHeight = 300;
    } else if (isXl) {
        cols = 3; // Set number of columns to 3 for lg screens
        rowHeight = 200;
    }

    console.log("ITEM DATA: ", itemData)

    return (
        <>
            {isWideScreen ?
                (
                    <Grid container>
                        <Grid item xs={6}>
                    <ImageList sx={{width: {xs: 400, sm: 400, md: 400, lg: 500, xl: 500}, height: 550}} cols={cols}
                               rowHeight={rowHeight}>
                                {itemData.map((item) => (
                            isProfile ? (
                                        <ImageListItem key={item.portfolioImageId}>
                                <img
                                                src={`${item.portfolioImageUrl}?w=164&h=164&fit=crop&auto=format`}
                                    // loading="lazy"
                                                onClick={() => handleClick(item.portfolioImageUrl)}
                                    style={{cursor: "pointer"}}
                                />
                            </ImageListItem>
                            ) : (
                                 <ImageListItem key={item.postImageId}>
                                <img
                                    src={`${item.postImageUrl}?w=164&h=164&fit=crop&auto=format`}
                                    // loading="lazy"
                                    onClick={() => handleClick(item.postImageUrl)}
                                    style={{cursor: "pointer"}}
                                />
                            </ImageListItem>
                            )
                        ))}
                    </ImageList>
                </Grid>
                <Grid item xs={6}>

                    <Card
                        // width={500}
                        // height={450}
                        sx={{maxWidth: 500, maxHeight: 450}}
                    >
                        <CardMedia
                            component="img"
                            height="450"
                            width="500"
                            image={selectedImage}
                            alt="Image"
                            sx={{objectFit: "contain",  display: selectedImage ? "block" : "none"}}
                            // display={selectedImage == null ? 'none' : 'block'}
                        />
                    </Card>
                </Grid>
                    </Grid>
                )
                :
                (
                    isProfile ? (
                        <ImageListSm portfolioImages={itemData} isProfile={isProfile} />
                    ) : (
                        <ImageListSm itemData={itemData} isProfile={isProfile} />
                                )

                )
            }
        </>
    );
}

Portfolio.propTypes = {
    isProfile: PropTypes.bool.isRequired,

    adImages: PropTypes.arrayOf(PropTypes.shape({
        postImageId: PropTypes.string.isRequired,
        postImageUrl: PropTypes.string.isRequired
    })),


    portfolioImages: PropTypes.arrayOf(PropTypes.shape({
        portfolioImageId: PropTypes.string.isRequired,
        portfolioImageUrl: PropTypes.string.isRequired,
        userPortfolioId: PropTypes.string.isRequired,
    })),
};

export default Portfolio;
