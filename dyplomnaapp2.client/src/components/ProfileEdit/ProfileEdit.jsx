import React, { useEffect, useState } from 'react'
import NavMenu from "../NavMenu/NavMenu";
import ProfileHeadEdit from "./ProfileHeadEdit";
import ProfileEditTabs from "./ProfileEditTabs";
import EditAboutSection from "./EditAboutSection";



function ProfileEdit() {
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProfile(data);
                setLoading(false);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, []);

    console.log("PROFILE EDIT DATA:", profile)


    if (loading) {
        return (
            <div>LOADING....</div>
        )
    }
    return(
        <div>
            <NavMenu/>
            <div style={{ marginTop: 50 }}>
                <ProfileHeadEdit userId={profile.userId} />
                <EditAboutSection userId={profile.userId} />
                <ProfileEditTabs userId={profile.userId} />
            </div>
        </div>
    )
}

export default ProfileEdit