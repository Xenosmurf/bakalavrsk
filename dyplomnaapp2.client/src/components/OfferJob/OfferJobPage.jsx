import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import NavMenu from "../NavMenu/NavMenu";
import CustomBrownButton from "../Advertisement/CustomBrownButton"
import { Box, Grid, List } from "@mui/material";
import Typography from "@mui/material/Typography";
import OfferAdItem from './OfferAdItem';
import { profile_route } from '../Routing/Routes';

function OfferJobPage() {
    const [userId, setUserId] = useState("");
    const [adList, setAdList] = useState([]);
    const [selectedAd, setSelectedAd] = useState("");
    const [loading, setLoading] = useState(true);
    const [receiver, setReceiver] = useState();
    const [error, setError] = useState("");

    const handleSelect = (value) => {
        setSelectedAd(value);
    }

    const navigate = useNavigate();

    var { receiverId } = useParams();

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/profiles/${receiverId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setReceiver(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setLoading(false);
            }
        };
        fetchProfile();
    }, [receiverId]);
    //console.log("receiver:", receiver)

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

    var linkToFetch = "/adserver/author/offer/";

    var link = `/adserver/author/offer/${userId}?excludeUserId=${receiverId}`;

    useEffect(() => {
        const getAdInfo = async () => {
            try {
                const response = await fetch(link);
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
    }, [userId, adList, link]);

    //console.log("AD LIST ......: ", adList)

    //console.log(receiverId)
    //console.log(userId)

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

    const handleOffer = async () => {
        try {
            if (!selectedAd) {
                setError("Оберіть оголошення");
            }
            else {
                setError("");
                const response = await fetch('/request/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "requestText": `Вам запропонували роботу ${selectedAd.title}`,
                        "receiverId": receiverId,
                        "adId": selectedAd.adId,
                        "applicantId": userId,
                        "seen": false,
                        "jobOffer": true,
                        "createdAt": getTodayDate()

                    }),
                });
                //navigate(profile_route +"/"+ receiverId);

                if (!response.ok) {
                    throw new Error('Failed to create advertisement');
                }
                else {
                    console.log("Ad was created successfully");
                    navigate(profile_route + "/" + receiverId);

                }
                const data = await response.json();
                return data.adId;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create advertisement');
        }
    };

    //console.log(selectedAd);
    if (loading) {
        return (
            <div>LOADING.....</div>
        )
    }

    if (!receiver || !adList) {
        return null
    }

    return (
        <>

            <NavMenu />
            <div style={{ marginTop: 50 }}>
                <Grid container columns={{ xs: 8, sm: 8, md: 12, lg: 12, xl: 12 }}>
                    <Grid item xs={8} sm={8} md={12} lg={12} xl={12}>
                        <Box sx={{height:"100px" }} />
                    </Grid>

                    {/* <Grid item xs={4} sm={0} /> */}
                        {/* <div style={{ display: "flex", alignContent:"center", flexDirection:"row" }}> */}
                        <Grid item xs={0} sm={0} md={2} lg={2} xl={2}/>
                        <Grid item xs={3} sm={3} md={5} lg={5} xl={5}>
                            <Typography
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "500",
                                    fontSize: '20px',
                                    color: '#694040',
                                }}
                            > Запропонувати фахівцеві/вчині {receiver.username} 
                            </Typography>
                            </Grid>
                            <Grid item xs={3} sm={3} md={5} lg={5} xl={5}>
                            <Typography
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "700",
                                    fontStyle: "italic",
                                    fontSize: '20px',
                                    color: 'black',
                                    marginLeft: "2%",
                                }}
                            >{selectedAd.title}
                            </Typography>
                            </Grid>

                        {/* </div> */}

                    <Grid item xs={2} sm={0} />
                    <Grid item xs={8}>
                        <Box sx={{
                            maxHeight: { xl: '550px', md: '450px', sm: '400px', xs: '400px' },
                            overflowY: 'auto',
                            border: '2px solid #E0CECE',
                            borderRadius:"24px"
                        }}>
                            <List
                                disablePadding
                                sx={{
                                    height: 'auto'
                                }}
                            >
                            {adList.map((item, index) => (
                                <OfferAdItem
                                    key={item.adId}
                                    adId={item.adId}
                                    payment={item.payment}
                                    title={item.title}
                                    description={item.descriptionAd}
                                    deadline={item.deadline}
                                    onSelect={handleSelect}
                                />
                            ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={0} />
                    <Grid item xs={8} sm={8} md={12} lg={12} xl={12}>
                        <Box sx={{ height: "100px" }} />
                    </Grid>
                    <Grid item xs={4} sm={0} />

                    <Grid item xs={8}>
                        <CustomBrownButton label="Запропонувати" onClick={handleOffer} />
                    </Grid>
                </Grid>
                {/*<ProfileHead name={profile.username} isCurrentUser={!id} userId={profile.userId} />*/}
                {/*{console.log(profile.userId)}*/}
                {/*{console.log(!id)}*/}
                {/*<AboutSection description={profile.description} />*/}
                {/*<FullWidthTabs userId={profile.userId} />*/}
            </div>
        </>
    )
}


export default OfferJobPage