import React from "react";
import { Typography } from "@mui/material";

function CustomTypo16px(props) {
    return (
        <Typography
            sx={{
                fontStyle: "Poppins",
                fontSize: "16px",
                fontWeight: "400",
                color: "#111111",
            }}
        >
            {props.text}
        </Typography>
    );
}

export default CustomTypo16px;
