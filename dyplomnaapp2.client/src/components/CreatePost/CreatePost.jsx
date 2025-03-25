import NavMenu from "../NavMenu/NavMenu";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import AddPhotos from "../AddPhotos/AddPhotos";
import AdTextfield from "../CreateAd/AdTextfield";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from 'react-router-dom';
import { profile_route } from "../Routing/Routes";



function CreatePost(){

    const [userId, setUserId] = useState();
    const [postText, setPostText] = useState("");
    const [images, setImages] = useState();
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleImagesChange = (newImages) => {
        setImages(newImages);
    };

    const handlePostText = (value) => {
        setPostText(value);
    }
    const isWideScreen = useMediaQuery("(min-width:1000px)");

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserId(data.userId);
                //    setIsUserAuth(true); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, []);

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');
        const ss = String(today.getSeconds()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
    };

    const getFileUrls = async (filenames, postId) => {
        const urls = await Promise.all(filenames.map(async (filename) => {
            const blobUrlEndpoint = `/image/bloburl?name=${encodeURIComponent('post' + postId.toString() + filename.name)}`;

            try {
                const blobResponse = await fetch(blobUrlEndpoint);

                if (!blobResponse.ok) {
                    throw new Error("Failed to fetch blob URL");
                }

                const blobResponseData = await blobResponse.json();
                console.log("Blob URL response data:", blobResponseData);
                addToDb(blobResponseData.url, postId);
                return blobResponseData.url;
            } catch (error) {
                console.error("Error fetching blob URL:", error);
                return null; // Handle error by returning null or some default value
            }
        }));

        return urls.filter(url => url !== null); // Filter out any null values
    };

    const addToDb = async (imageUrl, postId) => {
        var url = "/addphotos/create/postimage"

        //"postCard": {
        //    "postCardText": postText,
        //    "createdAt": getTodayDate(),
        //    "authorPostId": userId,

        //}

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "postImageUrl": imageUrl,
                    "postId": postId,
                  

                }),
            });

            if (response.ok) {
                console.log('post DB image created successfully');
            } else {
                console.error('Failed to create post image:', response.statusText);
            }
            //navigate(profile_route);
        } catch (error) {
            console.error('Error creating ad image:', error);
        }
    }


    const uploadImages = async (images, postId) => {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('/image?prefix=post' + postId.toString(), {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Upload successful:', data);
                //    console.log("IMAGES URL:", imagesURLS);
            }
            else {
                console.error('Upload failed:', response.statusText);
            }
            const imagesURLS = await getFileUrls(images, postId);

        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }

    const createPost = async () => {
        try {
            if (!postText) {
                setError("Заповніть текстове поле");
            }
            else {
                setError("");
                const response = await fetch('/postcards/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        authorPostId: userId,
                        postCardText: postText,
                        createdAt: getTodayDate()
                    }),
                });
                console.log("Post was created successfully");
                //navigate(profile_edit_route);

                if (!response.ok) {
                    throw new Error('Failed to create Post');
                }
                const data = await response.json();
                uploadImages(images, data.postId);

                //return data.adId;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create Post');
        }
    };

    //console.log("CREATE POST IMAGES:", images)
    return(
        <div>
            <NavMenu/>
            <div style={{ marginTop: 50, marginRight: isWideScreen ? "20%" : 0, marginLeft: isWideScreen ? "20%" : 0, alignContent: "center" }}>
                <AdTextfield label="Текст посту" placeholder="" maxLength={10000} maxRows={6} minRows={3} marginTop="2%" onChange={handlePostText} value={postText} />
                <Typography>{error}</Typography>
                <AddPhotos userId={userId} onImagesChange={handleImagesChange} />
                <CustomBrownButton label="Опублікувати" onClick={createPost} />
            </div>

        </div>
    )
}

export default CreatePost