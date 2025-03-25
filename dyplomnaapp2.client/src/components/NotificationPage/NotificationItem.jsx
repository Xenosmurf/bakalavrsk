import React from "react";
import {Avatar, Box, Divider, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import StarIcon from '@mui/icons-material/Star';
import { Card } from "reactstrap";
import {  CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { advertisement_route, profile_route, signup_route } from "../Routing/Routes";
import ArticleIcon from '@mui/icons-material/Article';
import PropTypes from 'prop-types';
import ToAdvertisementBtn from "./ToAdvertisementBtn";
import ToProfileBtn from "./ToProfileBtn";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import { useState } from "react";


function NotificationItem(props) {
    const { requestId, requestText, receiverId, adId, applicantId, seen, approved, jobOffer, createdAt } = props
    const [disabledBtn, setDisabledBtn] = useState(false);

    const IsJustInformative = (jobOffer == null)
    const navigate = useNavigate();

    const openProfile = (applicantId) => {
        navigate(`/profile/${applicantId}`);
    };

    const openAd = (adId) => {
        navigate(`/advertisement/${adId}`);
    };

    const handleApprove = async (requestIdUpdate, approveUpdate) => {
        const url = `/request/update-approve/${requestIdUpdate}`;
        console.log("REQUEST ID:", requestIdUpdate);
        console.log("approveUpdate ID:", approveUpdate);
        console.log("url:", url);

        //const requestBody = JSON.stringify({
        //     approveUpdate
        //});
        //console.log(requestBody)

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: approveUpdate
            });

            if (!response.ok) {
                // Handle errors
                if (response.status === 404) {
                    console.error('Request not found');
                } else {
                    console.error('Error:', response.statusText);
                }
                return;
            }

            const data = await response.json();
            console.log('Success:', data);
            //return data;
        } catch (error) {
            console.error('Error:', error);
        }

    };



    return(
        <div>
            <Card padding="2%" sx={{ maxWidth: 345, margin: '10%' }}>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent:'space-between'
                    }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection:"column"
                        }}>
                        <Typography
                            sx={{
                                fontFamily: "Jost",
                                fontWeight: "300",
                                color: "#000000"
                            }}>
                            {createdAt.split("T")[0]}
                        </Typography>
                        <Typography sx={{
                            fontFamily: "Jost",
                            fontWeight: "400",
                            fontSize: { xs: "20px", sm: "20px", md: "20px", lg: "25px", xl: "25px" }
                        }}>
                            {requestText}
                        </Typography>
                        <div style={{ padding: "2%", display: approved == null && jobOffer!=null ? "flex" : "none", flexDirection: "row" }} >
                            <CustomBrownButton label="Approve" onClick={() => handleApprove(requestId, true)} />
                        <div style={{ padding:"2%" }} />
                            <CustomBrownButton label="Decline" onClick={() => handleApprove(requestId, false)} />
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent:"center"
                    }}
                    >
                        <div style={{ display: jobOffer ? "block" : "none" }}>
                            <ToProfileBtn onClick={() => openProfile(applicantId)} />
                        </div>
                        <ToAdvertisementBtn onClick={() => openAd(adId)} />
                    </div>
                </CardContent>
            </Card>
            <Divider />

        </div>
    );
}

NotificationItem.propTypes = {
    requestId: PropTypes.string,
    requestText: PropTypes.string,
    receiverId: PropTypes.string,
    adId: PropTypes.number,
    applicantId: PropTypes.string,
    seen: PropTypes.bool,
    approved: PropTypes.bool,
    jobOffer: PropTypes.bool,
    createdAt: PropTypes.string,
};

export default NotificationItem;
