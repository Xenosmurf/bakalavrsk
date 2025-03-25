import React, { useRef, useState } from "react";
import { IconButton } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PropTypes from 'prop-types';


function AddPhotoBtn({ onFilesChange , disabledButton}) {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        // Pass the files to the parent component
        if (onFilesChange && files) {
            onFilesChange(files);
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
            <IconButton
                onClick={handleButtonClick}
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
        </>
    );
}

AddPhotoBtn.propTypes = {
    onUpload: PropTypes.func,
    disabledButton: PropTypes.bool.isRequired,
};

export default AddPhotoBtn;
