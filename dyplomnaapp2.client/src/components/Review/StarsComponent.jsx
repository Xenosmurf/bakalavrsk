import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';



function StarsComponent(props) {
    const number = props.number; // or any value up to 5

    // Create an array to hold the indices of stars
    const stars = Array.from({ length: number }, (_, index) => index);

    return (
        <div>
            {/* Render StarIcon for each index in the stars array */}
            {stars.map((index) => (
                <StarIcon key={index} />
            ))}
        </div>
    );
}

StarsComponent.propTypes = {
    number: PropTypes.number.isRequired,
};

export default StarsComponent;
