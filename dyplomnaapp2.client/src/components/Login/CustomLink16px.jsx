import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function CustomLink16px(props) {
    return (
        <Link to={props.link}  >
            <Typography
                textAlign={props.align}
                sx={{
                    fontStyle: "Poppins",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#111111",
                }}
            >
                {props.text}
            </Typography>
        </Link>
    );
}

export default CustomLink16px;
