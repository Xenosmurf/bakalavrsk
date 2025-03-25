import React, { useEffect, useState } from 'react';
import { Avatar, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ReviewSection from "./ReviewSection";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import { offer_job_route, profile_edit_route } from "../Routing/Routes";
import PropTypes from 'prop-types';


function ProfileHead(props) {
    const {userId, isCurrentUser, avatarImage, name } = props;

    const [profile, setProfile] = useState();

    useEffect(() => {
        const fetchProfile = async (profileId) => {
            try {
                const response = await fetch(`/profiles/${profileId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfile(data);
                console.log("Profile head data.......................:", data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile(userId);
    }, [userId]);

    //const isCurrentUser = props.isCurrentUser;
    //const avatarImage = props.avatarImage
    //const name = props.name

    if (!profile) {
        return null; // or loading indicator
    }

    return(
        <Box
        
            sx={{
                backgroundColor: "#694040",
                display: 'flex',
                alignItems: 'center',
                //padding: '2px 16px',
                flexDirection:'row',
                justifyContent: 'space-between',
                /*maxWidth:"100vh"*/
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems:'center'
            }}>
            <Avatar
                    sx={{
                        marginRight: '16px',
                        margin: '2%',
                        width: '100px',
                        height: '100px'
                    }}
                    src={profile.avatarURL ? profile.avatarURL : null}
                    alt={profile.username}

            />
            <div>
                <Typography
                    sx={{
                        fontFamily: "Jost, sans-serif",
                        color: "white",
                        fontWeight: "500",
                        fontSize:'28px',
                        margin:'2%'
                        }}>
                        {/*Ім'я*/}
                        {name}
                    </Typography>
            </div>
            </div>
            {/*<div*/}
            {/*style={{*/}
            {/*    marginRight:'10%'*/}
            {/*}}>*/}

            <div
            style={{
                display:"flex",
                flexDirection:"column"
            }}>
                <div
                style={{
                    display:"flex"
                    }}>
                    {/*<ReviewSection color='#FFF' role="фахівець" rating={0} number_reviews={0} />*/}
                    {/*<ReviewSection color='#FFF' role="фахівець" rating={profile.ratingExpert} number_reviews={profile.numberReviewExpert} />*/}


                    {/*<ReviewSection color='#FFF' role="замовник" rating={profile.ratingEmployer} number_reviews={profile.numberReviewEmployer} />*/}
                    {/*<ReviewSection color='#FFF' role="замовник" rating={0} number_reviews={0} />*/}
                </div>

                <div>
                    {isCurrentUser ? (
                        <CustomBrownButton label="Редагувати профіль" href={profile_edit_route} backgroundColor="#9E6C6C"/>
                    ) : (
                        <CustomBrownButton label="Запропонувати роботу" href={offer_job_route+"/" + userId} backgroundColor="#9E6C6C" />
                    )}
                </div>
            </div>
            {/*</div>*/}


        </Box>
    );
}

ProfileHead.propTypes = {
    avatarImage: PropTypes.string,
    name: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
};

export default ProfileHead;