import React, { useEffect, useState } from 'react'
import { Box, List } from "@mui/material";
import Review from "./Review";
import PropTypes from 'prop-types';


function ReviewList(props) {
    const {isExpert, userId} = props

    const [reviewList, setReviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    var linkToFetch = "";
    if (isExpert) {
        linkToFetch = "/reviewExp/";
    }
    else {
        linkToFetch = "/reviewEmplo/";
    }

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch(linkToFetch + userId);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setReviewList(data);
                setLoading(false); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, [linkToFetch, userId]);

    console.log("REVIEW LIST:", reviewList);

    if (loading) {
        return (
            <div>LOADING...</div>
        )
    }

    //Review.propTypes = {
    //    reviewId: PropTypes.Guid.isRequired,
    //    createdAt: PropTypes.DateTime.isRequired,
    //    reviewText: PropTypes.string,
    //    rating: PropTypes.number.isRequired,
    //    adId: PropTypes.number.isRequired,
    //    authorId: PropTypes.string.isRequired,
    //    username: PropTypes.string.isRequired,

    return(
        <Box sx={{
            maxHeight: {xl:'550px',md:'450px', sm:'400px', xs:'400px'},
            overflowY: 'auto' }}>
            <List>

                {reviewList.map((rev) => (
                    <Review
                        key={rev.reviewId}
                        createdAt={rev.createdAt}
                        reviewText={rev.reviewText}
                        rating={rev.rating}
                        adId={rev.adId}
                        authorId={rev.authorExpertId}
                        username={rev.username}
                    />

                ))}
                {/*<Review/>*/}
                {/*<Review/>*/}
                {/*<Review/>*/}
                {/*<Review/>*/}
            </List>
        </Box>
    );
}

ReviewList.propTypes = {
    isExpert: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,

    //reviewId: PropTypes.Guid.isRequired,
    //createdAt: PropTypes.DateTime.isRequired,
    //reviewText: PropTypes.string,
    //rating: PropTypes.number.isRequired,
    //adId: PropTypes.number.isRequired,
    //authorId: PropTypes.string.isRequired,
    //username: PropTypes.string.isRequired,
};

export default ReviewList;