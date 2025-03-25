import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CustomBrownButton from "../Advertisement/CustomBrownButton";

import CustomLink16px from "./CustomLink16px";
import CustomTypo16px from "./CustomTypo16px";
import NavMenu from "../NavMenu/NavMenu";
import { signup_route, profile_route } from "../Routing/Routes";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "email") setEmail(value);
        if (name == "password") setPassword(value);
    };

    var loginurl = "";
    //if (rememberme == true)
    //    loginurl = "/login?useCookies=true";
    //else
    //    loginurl = "/login?useSessionCookies=true";

    loginurl = "/login?useSessionCookies=true";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password ) {
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
            fetch(loginurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((data) => {
                    console.log(data);
                    if (data.ok) {
                        setError("Successful login.");
                        navigate(profile_route)
                    }
                    else {
                        setError("Error login.");
                    }
                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error registering.");
                });
        }
    };

    return(
        <>
            <NavMenu/>
         <div
        style={{

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "92vh",
            marginTop: 50
        }}
      >
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
          <Typography>Вхід</Typography>
          <Grid
            container
            justifyContent="center"
            marginTop="8px"
            marginBottom="32px"
          >
            <Grid item marginRight="10px">
              <CustomTypo16px text="" />
            </Grid>
            <Grid item>
              <CustomLink16px text="Зареєструватись"
                              link={signup_route}
              />
            </Grid>
                    </Grid>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent:'center'
                        }}>
                    <TextField label="Електронна адреса" name="email" value={email}
                        onChange={handleChange}
                    />
                    <TextField label="Пароль" type="password" name="password" value={password}
                        onChange={handleChange}
                    />
                    {/*<CustomLink16px text="Забули пароль?" align="left" />*/}
                    <div>
                    <CustomBrownButton label="Увійти" color = "black"
                        onClick={handleSubmit} fullWidth
                            />
                        </div>
                    </div>
        </Box>
      </div>
        </>
    );
}
export default LoginPage;