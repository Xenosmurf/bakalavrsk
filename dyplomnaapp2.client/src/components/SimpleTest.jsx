//import React, { useState, useEffect } from "react";
//import Typography from "@mui/material/Typography";
//function SimpleTest() {
//    //const [profiles, setProfiles] = useState([]);

//    //useEffect(() => {
//    //    async function fetchData() {
//    //        try {
//    //            const response = await fetch('/myTest/get-profiles');
//    //            const data = await response.json();
//    //            console.log(data)
//    //            setProfiles(data);
//    //        } catch (error) {
//    //            //console.error('Error fetching profiles:', error);
//    //            console.log(error)

//    //        }
//    //    }

//    //    fetchData();
//    //}, []);

//    const [profile, setProfile] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const id = 1; // Example ID

//    useEffect(() => {
//        const fetchProfile = async () => {
//            console.log("trying to fetch1")
//            try {
//                console.log("trying to fetch")
//                const response = await fetch(`/myTest/my-profiles/${id}`);
//                const data = await response.json();
//                console.log('Profile data:', data); // Log the data received from the API
//                setProfile(data);
//                setLoading(false); // Set loading to false once data is fetched
//            } catch (error) {
//                console.error('Error fetching profile:', error);
//                setLoading(false); // Set loading to false in case of error
//            }
//        };

//        fetchProfile();
//    }, [id]);


//    if (loading) {
//        return <div>Loading...</div>; // Show loading indicator
//    }

//    if (!profile) {
//        return <div>Error fetching profile:(((</div>; // Show error message if profile is still null
//    }

//    return (
//        <div
//            style={{
//                marginTop:50
//            }}>
//            {/*{profiles.map(profile => (*/}
//                {/*<div key={profiles.user_id}>*/}
//            <Typography>{profile.Username}</Typography>
//                    {console.log(profile.Username)}
//                    <Typography>{profile.Email}</Typography>
//                    <Typography>{profile.Password}</Typography>
//                    <Typography>{profile.Created_at}</Typography>
//            {/*    </div>*/}
//            {/*))}*/}
//        </div>
//    )
//}

//export default SimpleTest
