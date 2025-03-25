import React, { useEffect, useState } from 'react'
import {Avatar, Box, List} from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import NavMenu from "../NavMenu/NavMenu";
import FullWidthTabs from "./Tabs";
import Typography from "@mui/material/Typography";
import ProfileHead from "./ProfileHead";
import AboutSection from "./AboutSection";

function Profile() {
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);

    const [isUserAuth, setIsUserAuth] = useState(false);

    //const id = "test@gmail.com"; // Example ID

    const [userId, setUserId] = useState("");

    var { id } = useParams();

   
    
    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setUserId(data.userId);
                setIsUserAuth(true); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, []);

    useEffect(() => {
        const fetchProfile = async (profileId) => {
            try {
                const response = await fetch(`/profiles/${profileId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfile(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };

        if (userId) {
            if (!id) {
                fetchProfile(userId);
            } else {
                fetchProfile(id);
            }
        }
    }, [id, userId]);

    // Rest of your component remains the same


    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    if (!profile) {
        return <div>Error fetching profile:(((</div>; // Show error message if profile is still null
    }
    if (!isUserAuth) {
        return (
            <div style={{
                color:'#00000'
            }}>
               You are not logged in try to log or to register

            </div>
        );
        
    }

    else {

        return (
            <div style={{

            }}>
                <NavMenu />
                <div style={{ marginTop: 50 }}>
                    <ProfileHead name={profile.username} isCurrentUser={!id} userId={profile.userId} />
                    {console.log(profile.userId) }
                    {console.log(!id) }
                    <AboutSection description={profile.description} />
                    <FullWidthTabs userId={profile.userId} />
                </div>

            </div>
        );
    }
}

export default Profile;
