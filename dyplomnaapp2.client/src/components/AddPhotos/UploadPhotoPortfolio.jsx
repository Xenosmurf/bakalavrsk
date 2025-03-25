import React, { useRef, useState } from "react";
import { IconButton } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PropTypes from 'prop-types';


function UploadPhotoPortfolio(props) {

    const { onUpload, disabledButton } = props
    const [selectedFile, setSelectedFile] = useState(null);

    //const handleFileChange = (event) => {
    //    setSelectedFile(event.target.files[0]);
    //};

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            onUpload(formData); // Send form data to the server
        }
    };



    return (
        <>
            <label htmlFor="upload-photo" style={{ display: 'inline-block' }}>

                <input
                    id="upload-photo"

                type="file"
                    style={{ display: "none" }}
                onChange={handleFileChange}
            />
                <IconButton
                    component="span"
                
                disabled={disabledButton}
                sx={{
                    color: "#694040",
                    "&:hover": {
                        backgroundColor: "#FFF",
                        color: "#9E6C6C",
                    },
                }}
            >
                
                <AddAPhotoIcon sx={{ height: "50px", width: "50px" }} />
                </IconButton>
            </label>
        </>
    );
}

UploadPhotoPortfolio.propTypes = {
    onUpload: PropTypes.func.isRequired,
    disabledButton: PropTypes.bool.isRequired,
};

export default UploadPhotoPortfolio;
