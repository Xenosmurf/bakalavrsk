import {List} from "@mui/material";
import PostCardManyPhotos from "../PostCard/PostCardManyPhotos";
import {useLocation} from "react-router-dom";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import {create_post_route} from "../Routing/Routes";
import PriceEditItem from "../PriceListEdit/PriceEditItem";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'



function PostList(props){
    const { userId } = props;

    const location = useLocation();
    const currentPath = location.pathname;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)


    //const removeAdItem = (adId) => {
    //    setAdList(prevAdList => prevAdList.filter(item => item.adId !== adId));
    //};
    const deleteItem = (postId) => {
        setItems(prevItems => prevItems.filter(item => item.postId !== postId));
    };
    const getUserId = async () => {
        try {
            const response = await fetch(`/postcards/myimages/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setItems(data);
            setLoading(false); // Assuming successful response means user is authenticated
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(() => {
        getUserId();
    }, [userId]);


    const refreshUi = async () => {
        getUserId();
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

    const deletePost = (postId) => {
        // Split the URL by "/"
        const url = `/postcards/${postId}`;

        // Define the request options
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Send the fetch request
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete postId: ${postId}`);
                }
                //return response.json();
            })
            .then(data => {
                //savePrices(userId);
                console.log(data); // Log the response data
            })
            .catch(error => {
                console.error(error); // Log any errors
            });
    }

    const deleteImagePost = (postId, images) => {
        // Split the URL by "/"
        const url = `/postcards/postimages/${postId}`;

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
                    throw new Error(`Failed to delete postId: ${postId}`);
                }
                deletePost(postId);
                deleteItem(postId);
                //return response.json();
            })
            .then(data => {
                //savePrices(userId);
                console.log(data); // Log the response data
            })
            .catch(error => {
                console.error(error); // Log any errors
            });
    }

 

    if (loading) {
        return (
            <div>LOADING...</div>
        )
    }

    return(
        <>
            {currentPath.includes("edit") ? (
                <div
                style={{
                    display:"flex",
                    flexDirection: "column",
                    justifyContent:"center",
                    alignItems:"center"
                }}>

                    <CustomBrownButton label="Створити пост" href={create_post_route}/>
                    <div style={{
                        padding:"1%"
                    }}/>
                    {/*<CustomBrownButton label="Зберегти"/>*/}
                </div>
            ) : (<div/>)}
            <List>
                {items.map((post, index) => (
                    
                    <PostCardManyPhotos
                        key={post.postId}
                        // nickname={post.nickname}
                        images = {post.images}
                        text={post.postCardText}
                        //avatar={post.avatarURL} // Static avatar URL
                        date={post.createdAt}
                        numberOfPhotos={post.images.length}
                        onDelete={() => deleteImagePost(post.postId, post.images)}
                    />
                ))}
                {console.log(items)}
            </List>
        </>
    );
}

PostList.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default PostList;