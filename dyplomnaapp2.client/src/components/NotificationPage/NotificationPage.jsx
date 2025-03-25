import React, { useEffect, useState } from 'react'
import NavMenu from "../NavMenu/NavMenu";
import {List} from "@mui/material";
import NotificationItem from "./NotificationItem";
import NotificTabs from './NotificTabs';



function NotificationPage() {
    const [userId, setUserId] = useState("");
    //const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserId(data.userId);
                //setLoading(false); 
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, []);

    if (!userId) {
        return null;
    }

    return (
        <>
            <NavMenu/>
            <div style={{ marginTop: 50 }}>
                <NotificTabs userId={userId} />
            </div>
        </>
    );

}

export default NotificationPage;