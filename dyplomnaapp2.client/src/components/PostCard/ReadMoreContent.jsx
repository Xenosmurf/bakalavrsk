
import React, { useState } from "react";
import Box from "@mui/material/Box";

const ReadMore = ({ children }) => {
    const text = children;
    // const text_length = props.text_length
    // const isALotOfText = text_length > 100;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <p className="text">
            {text}
            {/*{isReadMore ? text?.slice(0, 100) : text}*/}
            {/*<span*/}
            {/*    onClick={toggleReadMore}*/}
            {/*    className="read-or-hide"*/}
            {/*    style={{ color: '#3D2EE3' , fontWeight: 'bold', fontStyle:'Poppins'}}*/}
            {/*>*/}
            {/*    {isReadMore ? "...read more" : " \n show less"}*/}
            {/*</span>*/}
        </p>
    );
};

const Content = (props) => {
    return (
        <Box>
            {/* <h2> */}
            <ReadMore >
                {props.post_text}
            </ReadMore>
            {/* </h2> */}
        </Box>
    );
};

export default Content;