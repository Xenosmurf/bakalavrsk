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
import Button from "@mui/material/Button";
import UserCategories from './UserCategories';


function OneParentCategory(props) {

    const { oneParentCategoryName, childCategories, disabled, onClick, usedCategories, onAdd, maxCategories, isCreateAd } = props
    const [profileCategory, setProfileCategory] = useState();
    const [loading, setLoading] = useState(true);

    const handleClick = (categoryId, categoryName) => {
        if (isCreateAd) {
            onAdd({ categoryId, categoryName })
        }
        else {
            onAdd(categoryId);
        }
    }


    //if (loading) {
    //    return (
    //        <div>LOADING....</div>
    //    )
    //}

    return (
        <>
            <Typography
                sx={{
                    fontFamily: "Jost, sans-serif",
                    color: "black",
                    fontWeight: "500",
                    fontSize: '20px',
                    margin: '1%'
                }}
            >{oneParentCategoryName}</Typography>
            <List>

                {/*{items.map((post, index) => (*/}

                {/*    <PostCardManyPhotos*/}
                {/*        key={post.postId}*/}
                {/*        // nickname={post.nickname}*/}
                {/*        images={post.images}*/}
                {/*        text={post.postCardText}*/}
                {/*        //avatar={post.avatarURL} // Static avatar URL*/}
                {/*        date={post.createdAt}*/}
                {/*        numberOfPhotos={post.images.length}*/}
                {/*        onDelete={() => deleteImagePost(post.postId, post.images)}*/}
                {/*    />*/}
                {/*))}*/}

                {/*height: "80px",*/}
                {/*fontFamily: "Jost",*/}
                {/*fontWeight: "medium",*/}
                {/*fontSize: {lg: "20px", md: "16px" },*/}
                {/*textTransform: "none",*/}

                {childCategories.map((child, index) => (
                    <Button key={child.categoryId}
                        disabled={usedCategories.includes(child.categoryId) || usedCategories.length === maxCategories ? true : false}
                        onClick={() => handleClick(child.categoryId, child.categoryName)}
                        sx={{
                            color: "#694040",
                            backgroundColor: "#E0CECE",
                            //width: { lg: "80px", md: "70px", sm: "60px", xs: "50px" },
                            textTransform: "none",
                            borderRadius: "24px",
                            margin:"1%",
                            "&:hover": {
                                color: "#E0CECE",
                                backgroundColor: "#FFF",

                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#FFF",
                            },
                        }}
                    >
                    <Typography
                        sx={{
                            fontFamily: "Jost, sans-serif",
                            color: "black",
                            fontSize: '15px',
                                //margin: '2%',
                                "&:hover": {
                                    color: "#694040",
                                    backgroundColor: "#FFF",
                                },
                        }}
                        >
                        {child.categoryName}
                        </Typography>
                    </Button>
                ))}
                
            </List>
          
        </>
    )
}


OneParentCategory.propTypes = {
    oneParentCategoryName: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isCreateAd: PropTypes.bool,
    onClick: PropTypes.func,
    onAdd: PropTypes.func,
    maxCategories: PropTypes.number,
    childCategories: PropTypes.arrayOf(PropTypes.shape({
        categoryId: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        parentCategoryId: PropTypes.string.isRequired,

    })),
    usedCategories: PropTypes.arrayOf(PropTypes.shape({
        categoryId: PropTypes.string.isRequired,
    }))
};

export default OneParentCategory