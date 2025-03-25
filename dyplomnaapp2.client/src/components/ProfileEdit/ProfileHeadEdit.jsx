import { Avatar, Box, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useRef, useState, useEffect } from "react";
import ReviewSection from "../Profile/ReviewSection";
import AdTextfield from "../CreateAd/AdTextfield";
import ProfileEditTextfield from "./ProfileEditTextfield";
import {useLocation} from "react-router-dom";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import { profile_route } from "../Routing/Routes";
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';




function ProfileHeadEdit(props){

    const { userId } = props
    const [profile, setProfile] = useState();
    const [profilename, setProfilename] = useState("");
    const [error, setError] = useState("");

    const handleProfilename = (value) => {
        setProfilename(value);
    } 

    //const [avatarURL, setAvatarURL] = useState(");;

    useEffect(() => {
        const fetchProfile = async (profileId) => {
            try {
                const response = await fetch(`/profiles/${profileId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfile(data);
                setProfilename(data.username);
                console.log("Profile head data.......................:", data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile(userId);
    }, [userId]);

    const location = useLocation();
    const currentPath = location.pathname;

    const [selectedImage, setSelectedImage] = useState(null);
    const inputFileRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!profilename) {
            setError("Заповніть поле з ім'ям");
        }
        else {
            try {
                setError("");
                const response = await fetch(`/profiles/update-username/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profilename),
                });

                if (!response.ok) {
                    throw new Error('Failed to update avatar');
                }

                const updatedProfile = await response.json();
                setProfile(updatedProfile);
            } catch (error) {
                console.error('Error updating avatar:', error.message);
                throw error;
            }
        }

    }

    const deleteBlob = async (fullUrl) => {
        //const parts = portfolioImageUrl.split("/);;

        //// Get the last part of the URL (which should be the filename)
        //const filename = parts[parts.length - 1];

        const parts = fullUrl.split("/");
        const name = parts[parts.length - 1];


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


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            handleUpload(formData); // Send form data to the server
        }
    };

    const updateUserAvatar = async (newUrl, userId) => {
        try {
            const response = await fetch(`/profiles/update-avatar/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUrl),
            });

            if (!response.ok) {
                throw new Error('Failed to update avatar');
            }

            const updatedProfile = await response.json();
            setProfile(updatedProfile);
        } catch (error) {
            console.error('Error updating avatar:', error.message);
            throw error;
        }
    }


    const getFileUrl = async (filename) => {
        const blobUrlEndpoint = `/image/bloburl?name=${encodeURIComponent('avatar' + userId + filename)}`;

        try {
            const blobResponse = await fetch(blobUrlEndpoint);

            if (!blobResponse.ok) {
                throw new Error("Failed to fetch blob URL");
            }

            const blobResponseData = await blobResponse.json();
            console.log("Blob URL response data:", blobResponseData);

            // Assuming the response contains the URL of the blob
            //setImageURL(blobResponseData.url);
            updateUserAvatar(blobResponseData.url, userId);
            console.log("IMAGE URL AFTER SET.........", blobResponseData.url);
        } catch (error) {
            console.error("Error fetching blob URL:", error);
            // Handle error
        }
    }

    const handleUpload = async (formData) => {
        const url = `/image/one?prefix=avatar${userId}`;

        const file = formData.get('image'); // Assuming 'image' is the key used in formData.append
        if (profile.avatarURL) {
            deleteBlob(profile.avatarURL);
        }

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

    if (!profile) {
        return null; // or loading indicator
    }


    return(
        <Box
            sx={{
                background: "#694040",
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                flexDirection:'row',
                justifyContent: 'space-between',
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems:'center'
            }}>
                <label htmlFor="avatar-upload">
                    <IconButton
                        component="span"
                    >
                    <Avatar
                        // alt="Name"
                        src={profile.avatarURL}
                        alt={profile.username}
                      
                        style={{ cursor: "pointer" }}
                        sx={{
                            marginRight:'16px',
                                margin:'5%',
                                width: '100px',
                                height: '100px',
                        }}
                        />
                    </IconButton>
                </label>                    
               
                <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    id="avatar-upload"
                />
                    

                <div>
                    <ProfileEditTextfield placeholder="Ім'я" maxLength={20} maxRows={1} nameFromDB={profile.username} value={profilename} onChange={handleProfilename} />
                    <Typography>{error}</Typography>
                </div>
            </div>

            <div
            style={{
                width:"150px"
                }}>
                <CustomBrownButton label="Зберегти"  onClick={handleSave} />
            </div>


        </Box>
    );
}

ProfileHeadEdit.propTypes = {
    userId: PropTypes.string.isRequired,
    //priceList: PropTypes.arrayOf(PropTypes.shape({
    //    priceItemId: PropTypes.number.isRequired,
    //    priceName: PropTypes.string.isRequired,
    //    payment: PropTypes.number.isRequired,
    //    userId: PropTypes.string.isRequired
    //})).isRequired
};

export default ProfileHeadEdit;