import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import { List } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

function UserCategories(props) {

    const {userCategories, onClick } = props
    const [profileCategory, setProfileCategory] = useState();
    const [loading, setLoading] = useState(true);


    const handleClick = (categoryProfileId) => {
        onClick(categoryProfileId);
    }

    //if (loading) {
    //    return (
    //        <div>LOADING....</div>
    //    )
    //}

    return (
        <>
        
            <List>
                {userCategories.map((child, index) => (
                    <Box key={child.categoryProfileId}
                        sx={{
                            display: "inline-block",
                            margin: "1%",
                            backgroundColor: "#694040",
                            borderRadius: "24px",
                            padding: "8px", // Added padding for better appearance
                            whiteSpace: "nowrap"// Added padding for better appearance
                        }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            } }>
                      <Typography
                            sx={{
                                fontFamily: "Jost, sans-serif",
                                color: "white",
                                fontSize: '20px',
                                margin: '1%',
                                //"&:hover": {
                                //    color: "#694040",
                                //    backgroundColor: "#FFF",
                                //},
                            }}
                        >
                            {child.categoryName}
                        </Typography>

                            <IconButton
                                onClick={() => handleClick(child.categoryProfileId)}
                            sx={{
                                color: "#694040",
                                backgroundColor: "#E0CECE",
                                //width: { lg: "80px", md: "70px", sm: "60px", xs: "50px" },
                                textTransform: "none",
                                borderRadius: "24px",
                                margin: "1%",
                                "&:hover": {
                                    color: "#E0CECE",
                                    backgroundColor: "#FFF",

                                },
                                "&.Mui-disabled": {
                                    backgroundColor: "#FFF",
                                },
                            }}
                        >
                            <DeleteIcon/>
                            </IconButton>
                        </div>
                    </Box>
                ))}

            </List>

        </>
    )
}


UserCategories.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    userCategories: PropTypes.arrayOf(PropTypes.shape({
        categoryId: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        categoryProfileId: PropTypes.string.isRequired,
        profileId: PropTypes.string.isRequired,

    })),
    

};

export default UserCategories