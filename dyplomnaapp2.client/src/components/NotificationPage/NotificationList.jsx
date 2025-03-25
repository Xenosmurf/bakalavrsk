import React, { useState, useEffect } from 'react';
import { Box, List } from "@mui/material";
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';

function NotificationList(props) {
    const { receiverId, read } = props
    const [notifications, setNotifications] = useState([]);

    var urlToFetch = ""
    if (read) {
        urlToFetch = `/request/unseen?receiverId=${receiverId}`
    }
    else {
        urlToFetch = `/request/seen?receiverId=${receiverId}`
    }


    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch(urlToFetch);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, [urlToFetch, receiverId]);
    //console.log("USER ID", notifications)

    if (!notifications) {
        return null
    }
    //const { requestId, requestText, receiverId, adId, applicantId, seen, approved, jobOffer, createdAt } = props

    return (
        <>
            <List>
                {notifications.map((item) => (

                <NotificationItem
                    key={item.requestId}
                    requestId={item.requestId}
                    requestText={item.requestText}
                    receiverId={item.receiverId}
                    adId={item.adId}
                    applicantId={item.applicantId}
                    seen={item.seen}
                    approved={item.approved}
                    jobOffer={item.jobOffer}
                    createdAt={item.createdAt}
                    />

                ))}
            </List>
        </>
    
  );
}


NotificationList.propTypes = {
    receiverId: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
};

export default NotificationList;