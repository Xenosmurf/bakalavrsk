import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Link, useLocation } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import {
    profile_route,
    notification_route,
    job_route,
    expert_route,
    login_route
} from "../Routing/Routes";

const pages = [
    {
        label: "Сповіщення",
        icon: <NotificationsNoneIcon />,
        link: notification_route
    },
    {
        label: "Профіль",
        icon: <PermIdentityOutlinedIcon />,
        link: profile_route
    },
    {
        label: "Робота",
        icon: <WorkIcon />,
        link: job_route
    },
    {
        label: "Фахівці",
        icon: <EngineeringIcon />,
        link: expert_route
    },
    
];

function NavMenu() {
    // const navigate = useNavigate();

    // const isAuthenticated = true; // check whether user is authenticated
    const isWideScreen = useMediaQuery("(min-width:1000px)");

    const [isUserAuth, setIsUserAuth] = useState(false);
    const navigate = useNavigate();
    // const location = useLocation();
    //const isLoginSignupOpen =
    //    location.pathname === login_route || location.pathname === signup_route;

    //const handleExit = (e) => {
    //    e.preventDefault()
    //    localStorage.clear();
    //    navigate(login_route)
    //}


    useEffect(() => {
        const getUserAuth = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('User is UNAUTHARIZED');
                }
                const data = await response.json();
                setIsUserAuth(true); // Assuming successful response means user is authenticated
                //console.log("NAVMENU: ", isUserAuth)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserAuth();
    }, [isUserAuth]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ""

        })
            .then((data) => {
                if (data.ok) {

                    navigate("/");
                }
            })
            .catch((error) => {
                console.error(error);
            })
    };

    function handleLogout() {

        // Define the fetch options
        const options = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
            },
            body: '' // Optional, as body is empty in your curl request
        };

        // Send the POST request
        fetch("/logout", options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Assuming the server returns JSON response
            })
            .then(data => {
                //console.log('Success:', data);
                // Handle successful logout, e.g., redirect to login page
                navigate(login_route);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#D9D9D9",
                boxShadow: "none",
                maxHeight:'50px',
                alignItems:'center'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container alignItems="center">
                        <Grid item xl={2} lg={2} md={2.5} sm={4}>
                            <Link
                                to="/"
                                style={{ textDecoration: "none" }}

                            >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    sx={{
                                        mr: 2,
                                        display: { xs: "none", sm: "flex" },
                                        fontFamily: "Inika",
                                        fontWeight: 700,
                                        fontSize: { sm: "26px" },
                                        letterSpacing: "2%",
                                        color: "#694040",
                                        textDecoration: "none",
                                    }}
                                >
                                    MyApp
                                </Typography>
                            </Link>
                        </Grid>
                            <Grid item xl={8} lg={8} md={7} sm={6} xs={9}>
                                <Box sx={{ display: isUserAuth ? "flex" : "none", justifyContent: "center" }}>
                                    <div style={{ display:'flex' }}>
                                {pages.map(
                                    (page) =>
                                        ( // hide some menu items (requests, chat...) for a login and signup pages
                                            <Button
                                                startIcon={page.icon}
                                                component="a"
                                                href={page.link}
                                                key={page.label}
                                                sx={{
                                                    mx: { xl: 3, lg: 2, md: 1, sm: 1, xs: 0 },
                                                    color: "black",
                                                    textTransform: "none",
                                                    fontFamily: "Jost",
                                                    fontSize: "20px",
                                                    fontWeight: "400",
                                                    display: { xs: "flex", md: "flex" },
                                                }}
                                            >
                                                {isWideScreen ? page.label : null}
                                            </Button>
                                        )
                                        )}
                                    </div>
                                    <div style={{paddingRight:"2%"}}>
                                        <IconButton onClick={handleSubmit }>
                                            <LogoutIcon/>
                                        </IconButton>
                                    </div>
                                </Box>

                            </Grid>
                            
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
}

export default NavMenu;
