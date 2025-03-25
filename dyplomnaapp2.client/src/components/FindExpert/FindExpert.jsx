import NavMenu from "../NavMenu/NavMenu";
import { List } from "@mui/material";
import OneParentCategory from '../Categories/OneParentCategory';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import ExpertItem from "./ExpertItem";


function FindExpert() {
    const [userId, setUserId] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const handleFilter = (value) => {
        setFilterCategory(value);
    }

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserId(data.userId);
               /* setIsUserAuth(true);*/ // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, [userId]);

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                //setLoading(true);
                const response = await fetch(`/categories/withsub/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setAllCategories(data);
                setLoading(false);
                //setIsUserAuth(true); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getAllCategories();
    }, []);


    useEffect(() => {
        var url = "";
        if (!filterCategory) {
            url = `profiles/all?pageNumber=${pageNumber}&pageSize=10&excludeUserId=${userId}`
        }
        else {
            url = `categoryprofile/profilesbycategory/${filterCategory.categoryId}?excludeUserId=${userId}`
        }

        const getProfiles = async () => {
            try {
                //setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProfiles(data);
                setLoading(false);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getProfiles();
    }, [filterCategory, pageNumber, userId]);


    //    const { userId, avatarURL, username, rating_expert, number_reviews_expert, onClick } = props

    if (loading ) {
        return (
            <CircularProgress color="inherit" />
        )
    }
    if (!userId) {
        return null
    }


    return(
        <>
            <NavMenu/>
            <div style={{
                marginTop: 50
            }}>
                <Typography>
                    {filterCategory.categoryName}
                </Typography>
                <div style={{ display: "flex", flexDirection:"row" }}>
                 <div style={{ display: "flex", flexDirection:"row", width:"20%" }}>
                    <List>
                        {allCategories.map((category, index) => (
                            <OneParentCategory
                                key={category.categoryId}
                                oneParentCategoryName={category.categoryName}
                                childCategories={category.subCategoryName}
                                usedCategories={[]}
                                onAdd={handleFilter}
                                maxCategories={10}
                                isCreateAd={true}
                            />
                        ))}
                        </List>
                            <Divider orientation="vertical" sx={{ padding: "2%" }} flexItem />
                 </div>
                    <Grid container sx={{ width: "80%" }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {/*const { userId, avatarURL, username, rating_expert, number_reviews_expert, onClick } = props*/}

                        {profiles.map((item, index) => (
                            <Grid item xs={2} key={item.userId}>
                                <ExpertItem
                                    userId={item.userId}
                                    username={item.username}
                                    rating_expert={item.ratingExpert}
                                    number_reviews_expert={item.numberReviewExpert}
                                    avatarURL={item.avatarURL}
                                    />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default FindExpert;