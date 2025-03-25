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
import OneParentCategory from './OneParentCategory';
import { List } from "@mui/material";
import UserCategories from './UserCategories';



function Categories(props) {

    const { userId } = props
    const [profileCategory, setProfileCategory] = useState();
    const [allCategories, setAllCategories] = useState([]);


    const [usedCat, setUsedCat] = useState([]);

    const [loading, setLoading] = useState(true);

    const getUserCategories = async () => {
        try {
            const response = await fetch(`/categoryprofile/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProfileCategory(data);
            setUsedCat(getCategoryIds(data));
            setLoading(false);
            //setIsUserAuth(true); // Assuming successful response means user is authenticated
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    useEffect(() => {
        getUserCategories();
    }, []);
   

    /*console.log("PROFILE CATEGORIES:....", profileCategory);*/

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

    console.log("ALL CATEGORiES: ", allCategories);

    const addCategory = async (categoryId) => {
        var url = "/categoryprofile"


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "categoryId": categoryId,
                    "profileId": userId
                }),
            });

            if (response.ok) {
                getUserCategories();
                console.log('Ad DB image created successfully');
            } else {
                console.error('Failed to create ad image:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating ad image:', error);
        }
    }

    const deleteCategory = (categoryProfileId) => {
        // Split the URL by "/"

        const url = `/categoryprofile?categoryProfileId=${categoryProfileId}`;

        // Define the request options
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Send the fetch request
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete aditem: ${categoryProfileId}`);
                }
                getUserCategories();
                return response.json();
            })
            .then(data => {
                //savePrices(userId);
                console.log(data); // Log the response data
            })
            .catch(error => {
                console.error(error); // Log any errors
            });
    }



    function getCategoryIds(data) {
        return data.map(item => item.categoryId);
    }

    if (loading) {
        return (
            <div>LOADING....</div>
        )
    }
    if (!profileCategory) {
        return null;
    }

    return(
        <>
            <div>CATEGORIES</div>
            <UserCategories userCategories={profileCategory} onClick={deleteCategory}  />
            

            <List>
                {allCategories.map((category, index) => (
                    <OneParentCategory
                        key={category.categoryId}
                        oneParentCategoryName={category.categoryName}
                        childCategories={category.subCategoryName}
                        usedCategories={usedCat}
                        onAdd={addCategory}
                        maxCategories={10}
                    />
                ))}
            </List>
        </>
    )
}


Categories.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Categories