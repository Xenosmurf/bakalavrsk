/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import {Box, Grid, TextField} from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
import CustomTypo16px from "../Login/CustomTypo16px";
import CustomLink16px from "../Login/CustomLink16px";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
// import CustomButton from "../Login/CustomButton";
// import CustomTextField from "../Login/CustomTextField";
import { useNavigate } from "react-router-dom";
import { login_route, profile_route } from "../Routing/Routes";
// import { profile_route } from '../Routing/Routes'
// import FormHeader from "../Login/FormHeader";
import Button from "@mui/material/Button";
import NavMenu from "../NavMenu/NavMenu";
//import NavMenu from "../NavMenu/NavMenu";

function Signup() {
    // state variables for email and passwords
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate(login_route);
    }

    async function getUserId() {
 
        fetch('/pingauth')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => {
                console.log("USER ID FROM PINGAUTH:", data);
                handlePostToMyDb(data.userId, email, userName)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }


    // handle change events for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "userName") setUserName(value);
        if (name == "email") setEmail(value);
        if (name == "password") setPassword(value);
        if (name == "confirmPassword") setConfirmPassword(value);
    };

    var loginurl = "/login?useSessionCookies=true";
    function loginAfterSignup(loginEmail, loginPassword) {
        fetch(loginurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
        })
            .then((data) => {
                console.log(data);
                if (data.ok) {
                    console.log("success login with signup")
                    getUserId()
                }
                else {
                    console.log("Tragedy login with signup")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handlePostToMyDb(UserId, Email, Username) {

        const profileData = {
            userId: UserId,
            username: Username,
            email: Email,
        };

        fetch("/profiles/add-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        })
            .then((data) => {
                // handle success or error from the server
                console.log(data);
                if (data.ok) {
                    console.log(profileData)
                    console.log("success my post to db")
                    navigate(profile_route)
                }
                else {
                    console.log(profileData)
                    console.log("tragedy my post to db")
                }

            })
            .catch((error) => {
                // handle network error
                console.error(error);
                console.log(profileData)
            });
    }

    // handle submit event for the form
    const handleSubmit = (e) => {
        e.preventDefault();
        // validate email and passwords
        if (!email || !password || !confirmPassword || !userName) {
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userName,
                    email: email,
                    password: password,
                }),
            })
                //.then((response) => response.json())
                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok) {
                        setError("Successful register.");
                        //navigate(profile_route)
                        loginAfterSignup(email, password)
                        //getUserId()
                        /*handlePostToMyDb(userId, email, userName)*/
                        console.log("success");
                    }
                    else{
                        setError("Error registering.");
                        console.log("tragedy")}

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error registering.");
                });
        }
    };

    return (
        <>
        <Box
            sx={{
                 background: "#FFF", // "linear-gradient(circle 90deg, #e3bc2e, #e3bc2e 0%)", ???
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",

            }}
            >
                <NavMenu />
            <Box
                width={{ xs: "70%", sm: "50%", md: "40%", lg: "60%" }}
                padding="5%"
                sx={{
                    backgroundColor: "white",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                    marginTop: "5vh",
                    marginBottom: "5vh",
                    borderRadius: "24px",
                }}
            >
                {/*<FormHeader title="Реєстрація" />*/}
                <Grid
                    container
                    justifyContent="center"
                    marginTop="8px"
                    marginBottom="32px"
                >
                    <Grid item marginRight="10px">
                        <CustomTypo16px text="Уже є акаунт?" />
                    </Grid>
                    <Grid item>
                        <CustomLink16px text="Увійти" link={login_route} />
                    </Grid>
                </Grid>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                <TextField label="Ім'я" name="userName"
                    onChange={handleChange}
                    value={userName}
                />
                <TextField label="Електронна адреса" name="email"
                    onChange={handleChange}
                    value={email}
                />
                {/*<TextField label="Дата народження" type="date" InputLabelProps={{ shrink: true }}*/}
                {/*           // onChange={handleBirthday}*/}
                {/*/>*/}

                <TextField label="Пароль" type="password" name="password"
                    onChange={handleChange}
                    value={password}
                />
                <TextField label="Підтвердіть пароль" type="confirmPassword" name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                        />
                <div>
                <CustomBrownButton label="Зареєструватись"
                    onClick={handleSubmit} fullWidth
                    
                            />
                        </div>
                </div>
                {/*<Button label="Login"*/}
                {/*    onClick={handleLoginClick}*/}
                {/*    sx={{*/}
                {/*        backgroundColor: 'black',*/}
                {/*        color: '#FFF',*/}
                {/*        padding: "2%",*/}
                {/*        height:"50px"*/}
                {/*    } }*/}
                {/*/>*/}
            </Box>
            </Box>
        </>
    );
}

export default Signup;
