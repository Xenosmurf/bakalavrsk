import React, { useEffect, useState } from 'react'
import { Card } from "reactstrap";
import NavMenu from "../NavMenu/NavMenu";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Portfolio from "../Portfolio/Portfolio";
import ProfileHead from "../Profile/ProfileHead";
import ProfileAd from "./ProfileAd";
import Button from "@mui/material/Button";
import CustomBrownButton from "./CustomBrownButton";
import { useParams, useNavigate } from 'react-router-dom';
import { create_review } from '../Routing/Routes';

function Advertisement() {
    const theme2 = useTheme();
    const isXs = useMediaQuery(theme2.breakpoints.only("xs"));
    const isSm = useMediaQuery(theme2.breakpoints.only("sm"));
    const isMd = useMediaQuery(theme2.breakpoints.only("md"));
    const isLg = useMediaQuery(theme2.breakpoints.only("lg"));
    const isXl = useMediaQuery(theme2.breakpoints.only("xl"));

    //const isTherePhoto = true;

    let fontBig = '35px';

    if (isXs) {
        fontBig = '20px'
    } else if (isSm) {
        fontBig = '25px'
    } else if (isMd) {
        fontBig = '25px'
    } else if (isLg) {
        fontBig = '30px'
    } else if (isXl) {
        fontBig = '35px'
    }

    const [ad, setAd] = useState();
    const [author, setAuthor] = useState();
    const [userId, setUserId] = useState("");
    const [profile, setprofile] = useState("");
    const [alreadyAplied, setAlreadyAplied] = useState(false);
    const [ifUserApproved, setIfUserApproved] = useState(false);
    let { adId } = useParams();

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserId(data.userId);
                setLoading(false);
                /*setIsUserAuth(true);*/ // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, [userId]);
    console.log("USER ID", userId)

    useEffect(() => {
        const checkAlreadyAplied = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/request/already-aplied?profileId=${userId}&adId=${adId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAlreadyAplied(data.aplied);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };
        checkAlreadyAplied();
    }, [adId, userId, alreadyAplied]);
    console.log(alreadyAplied)

    //useEffect(() => {
    //    const checkIfUserApproved = async () => {
    //        setLoading(true);
    //        try {
    //            const response = await fetch(`/request/approved-user?profileId=${userId}&adId=${adId}`);
    //            if (!response.ok) {
    //                throw new Error('Network response was not ok');
    //            }
    //            const data = await response.json();
    //            setIfUserApproved(data.userApproved);
    //        } catch (error) {
    //            console.error('Error fetching profile:', error);
    //            setLoading(false);
    //        }
    //    };
    //    checkIfUserApproved();
    //}, [adId, userId, setIfUserApproved]);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/profiles/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setprofile(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    useEffect(() => {
        const getAdInfo = async () => {
            try {
                const response = await fetch(`/adserver/adwithimages/${adId}`);
                console.log("adid:", adId)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setAd(data);
                setAuthor(data.userId);
                setLoading(false); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getAdInfo();
    }, [adId]);

    //const date = ad.created_at

    //const parts = date.split("T");
    //const dateOfCreation = parts[0];
    const dateOfCreation = "some date";

    //const isTherePhoto = ad.adImages.length > 0;


    console.log("AD ID:", adId);
    console.log("AUTHOR DATA:", author);

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

    const handleApply = async () => {
        try {
            setLoading(true);
           console.log("Author:",author)
            const response = await fetch('/request/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "requestText": `${profile.username} відгукнувся/лась ${ad.title}`,
                    "receiverId": author.userId,
                    "adId": adId,
                    "applicantId": userId,
                    "seen": false,
                    "jobOffer": false,
                    "createdAt": getTodayDate()
                }),
            });
            

            if (!response.ok) {
                throw new Error('Failed to You aplied');
            }
            else {
                console.log("You aplied successfully");
            }
            const data = await response.json();
            setLoading(false)
            return data.adId;
            
        } catch (error) {
            console.error(error);
            setLoading(false)
            throw new Error('Failed to You aplied');
        }
    };


    async function createReviewAsEmployer(review) {
        const url = '/reviewEmplo/create'; // Replace with your actual API URL

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "createdAt": getTodayDate(),
                    "reviewText": "string",
                    "rating": 0,
                    "adId": 0,
                    "authorExpertId": "string"
                })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to create review: ${errorMessage}`);
            }

            const result = await response.json();
            console.log('Review created successfully:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (loading) {
        return (
            <div>LOADING...</div>
        )
    }

    if (!ad) {
        return null
    }

    return(
        <>
            <NavMenu/>
            <div style={{ marginTop: 50, padding:'2%'}}>
                <div>
                    <ProfileAd
                        name={author.username}
                        avatarUrl={author.avatarURL}
                        rating={author.ratingEmployer}
                        number_review={author.numberReviewEmployer}
                        userId={author.userId} />
                    {console.log(author.numberReviewEmployer) }
                    {/*const name = props.name;*/}
                    {/*const avatarUrl = props.avatarUrl;*/}
                    {/*const rating = props.rating;*/}
                    {/*const number_review = props.number_review;*/}
                </div>
                <div
                style={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                    <Typography
                    sx={{
                        fontFamily:'Jost, sans-serif',
                        color:'black',
                        fontSize: fontBig,
                        fontWeight:'500'
                    }}>
                        {/*заголовок оголошення*/}
                        {ad.title}
                    </Typography>

                    <Typography
                    sx={{
                        fontFamily:'Jost, sans-serif',
                        color:'#BD0000',
                        fontWeight:'600',
                        fontSize: fontBig
                    }}>
                        {ad.payment} грн
                    </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    sx={{
                        fontFamily:'Jost, sans-serif',
                        fontSize: fontBig,
                        fontWeight:'400',
                        fontStyle:'italic',
                        textDecoration: 'underline'
                    }}
                >Категорія: {ad.categoryName}</Typography>
                <Typography
                    sx={{
                        fontFamily: 'Jost, sans-serif',
                        fontSize: fontBig,
                        fontWeight: '400',
                    }}
                    > {ad.statusAd}</Typography>
                </div>
                <Box
                sx={{
                    alignItems: 'center',
                    backgroundColor:'#E0CECE',
                    borderRadius:'24px',
                    padding:'2%'
                    }}>
                    <Typography
                        sx={{
                            fontFamily: 'Jost, sans-serif',
                            fontSize: fontBig,
                            fontWeight: '400',
                            fontStyle: 'italic',
                            textDecoration: 'underline'
                        }}
                    >опис:</Typography>
                    <Typography
                        sx={{
                            fontFamily:'Jost, sans-serif',
                            fontSize: fontBig,
                            fontWeight:'300',
                        }}>
                        {ad.descriptionAd}
                    </Typography>
                </Box>
                <div
                    style={{
                        display:'flex',
                        justifyContent:'space-between'
                    }}>
                    <Typography
                        sx={{
                            fontFamily:'Jost, sans-serif',
                            fontSize: `calc(${fontBig} - 10px)`,
                            fontWeight:'500',
                            color:'#977272',
                        }}>
                        Дедлайн: {ad.deadline }
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily:'Jost, sans-serif',
                            color:'#977272',
                            fontWeight:'600',
                            fontSize: `calc(${fontBig} - 10px)`,
                        }}>

                        {/*//const date = ad.created_at*/}

                        {/*//const parts = date.split("T");*/}
                        {/*//const dateOfCreation = parts[0];*/}
                        Створено: {(ad.createdAt).split("T")[0]}
                    </Typography>
                </div>
                {ad.adImages.length > 0 ?
                    (<Portfolio adImages={ad.adImages} isProfile={false} />) :
                    (<div
                        style={{
                            padding:'2%'
                    }}/>)
                }

               

                {console.log(ad)}
                {console.log(userId)}
                {(userId == ad.expertId) || ((userId == ad.authorId) && ad.expertId != null) ?
                    (
                        <div
                        style={{
                            display:  'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                            }}>
                            <CustomBrownButton label="залишити відгук" onClick={() => navigate(create_review + "/" + ad.adId)} />
                    </div>
                    ) : (
                        <div
                            style={{
                                display: (ad.expertId != null) ? 'none' : 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <CustomBrownButton label="відгукнутись" onClick={handleApply} />
                        </div>
                    )
                }
            </div>
        </>
    );
}
export default Advertisement;