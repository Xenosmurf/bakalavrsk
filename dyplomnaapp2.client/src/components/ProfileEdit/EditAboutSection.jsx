import Typography from "@mui/material/Typography";
import AdTextfield from "../CreateAd/AdTextfield";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


function EditAboutSection(props) {
    const { userId } = props
    const [profileDescription, setProfileDescription] = useState("");

    const handleDescription = (value) => {
        setProfileDescription(value);
    }


    useEffect(() => {
        const fetchProfile = async (profileId) => {
            try {
                const response = await fetch(`/profiles/${profileId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfileDescription(data.description);
                console.log("Profile head data.......................:", data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile(userId);
    }, [userId]);

    const handleSave = async () => {
        try {
            const response = await fetch(`/profiles/update-description/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileDescription),
            });

            if (!response.ok) {
                throw new Error('Failed to update description');
            }

            const updatedProfile = await response.json();
            setProfileDescription(updatedProfile.description);
        } catch (error) {
            console.error('Error updating description:', error.message);
            throw error;
        }
    }

    console.log("profileDescription", profileDescription);
    //if (!profileDescription) {
    //    return null; // or loading indicator
    //}

    return(
        <div style={{
            marginBottom:"10px"
        }}>
            <Typography
                sx={{
                    fontFamily:'Jost',
                    fontWeight:'800',
                    fontSize:'28px',
                    color:'#694040'
                    // fontStyle:'bold'
                }}>
                про себе:
            </Typography>
            <div
            style={{
                display:"flex",
                alignItems:"center"
            }}>
                <div style={{
                    width:"80%"
                }}>
                    <AdTextfield value={profileDescription} placeholder="Pозкажіть про себе" maxLength={150} maxRows={4} minRows={2} multiline onChange={handleDescription} />
                </div>
                <div style={{padding:"2%"}}/>
                <div style={{
                    width:"20%"
                }}>
                    <CustomBrownButton label="зберегти" onClick={handleSave} />
                </div>

            </div>

        </div>
    )
}

EditAboutSection.propTypes = {
    userId: PropTypes.string.isRequired,
    //adId: PropTypes.number.isRequired,
    //payment: PropTypes.number.isRequired,
    //title: PropTypes.string.isRequired,
    //avatarURL: PropTypes.string,
    //username: PropTypes.string.isRequired,
    //statusAd: PropTypes.string.isRequired,
    //deadline: PropTypes.string.isRequired,
    //onClick: PropTypes.func
};

export default EditAboutSection;
