import {Box, Grid, List} from "@mui/material";
import AdItem from "./AdItem";
import {useLocation} from "react-router-dom";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import { create_ad_route } from "../Routing/Routes";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";



function AdList(props) {
    const { userId, author } = props;

    const location = useLocation();
    const currentPath = location.pathname;

    const [adList, setAdList] = useState([]);
    const [loading, setLoading] = useState(true);


    var linkToFetch = "";
    if (author) {
        linkToFetch = "/adserver/author/";
    }
    else {
        linkToFetch = "/adserver/expert/"
    }

    useEffect(() => {
        const getAdInfo = async () => {
            try {
                const response = await fetch(linkToFetch + userId);
                //console.log("AdList:", userId)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                //console.log(data);
                setAdList(data);
                setLoading(false); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch adlist:', error);
            }
        };

        getAdInfo();
    }, [linkToFetch, userId]);

    const removeAdItem = (adId) => {
        setAdList(prevAdList => prevAdList.filter(item => item.adId !== adId));
    };

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

    const deleteBlobArray = async (array) => {
        const urls = await Promise.all(array.map(async (image) => {
            //const blobUrlEndpoint = `/image/bloburl?name=${encodeURIComponent('ad' + adId.toString() + filename.name)}`;
            const url = (image.postImageUrl)
            const parts = url.split("/");
            const filename = parts[parts.length - 1];

            try {
                const blobResponse = await deleteBlob(filename);

                if (!blobResponse.ok) {
                    throw new Error("Failed to fetch blob URL");
                }

                const blobResponseData = await blobResponse.json();
                console.log("Blob URL response data:", blobResponseData);
                //addToDb(blobResponseData.url, adId);
                return blobResponseData.url;
            } catch (error) {
                console.error("Error fetching blob URL:", error);
                return null; // Handle error by returning null or some default value
            }
        }));
    }

    const deleteAd = (adId, images) => {
        // Split the URL by "/"
     

        const url = `/adserver/${adId}`;

        // Define the request options
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        deleteBlobArray(images);
        // Send the fetch request
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete aditem: ${adId}`);
                }
                removeAdItem(adId);
                return response.json();
            })
            .then(data => {
                //savePrices(userId);
                console.log(data); // Log the response data
            })
            .catch(error => {
                console.error(error); // Log any errors
            });
    }
    
    //const priceList = props.priceList;
    if (loading) {
        return (
            <div>LOADING...</div>
        )
    }

    return(
        <Grid container columns={{ xs: 8, sm: 8, md: 12, lg: 12, xl:12}}>
            {currentPath.includes("edit") ?
                (
                    <>
                       <Grid item xs={4} sm={0}/>
                    <Grid item xs={8}>
                        <CustomBrownButton href={create_ad_route} label="Створити оголошення"/>
                    </Grid>
                        <Grid item xs={2} sm={0}/>
                        {/*<Grid item xs={2} sm={0}>GRid3</Grid>*/}
                    </>
                ) : (<Grid item xs={2} sm={0}/>)
                        }
            {/*<Grid item xs={2} sm={0}/>*/}
            <Grid item xs={8}>
                <Box sx={{
                    // maxHeight: "xs",
                    maxHeight: {xl:'550px',md:'450px', sm:'400px', xs:'400px'},
                    overflowY: 'auto' }}> {/* Adjust maxHeight and other styles as needed */}

                    <List
                    disablePadding
                sx={{
                    height:'auto'
                        }}>

                        {adList.map((item) => (
                            <AdItem key={item.adId}
                                adId={item.adId}
                                avatarUrl={item.authorAvatarUrl}
                                payment={item.payment}
                                title={item.title}
                                username={item.authorUsername}
                                deadline={item.deadline}
                                statusAd={item.statusAd}
                                expertId={item.expertId}
                                onClick={() => deleteAd(item.adId, item.adImages)}
                            />
                        )) }
                </List>
                </Box>
            </Grid>
            <Grid item xs={2} sm = {0}/>
        </Grid>
    );
}

AdList.propTypes = {
    userId: PropTypes.string.isRequired,
    author: PropTypes.bool.isRequired,
};

export default AdList;