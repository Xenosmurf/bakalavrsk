import React from 'react';
import Typography from '@mui/material/Typography';

function LinkTypography({ children, onClick }) {
    return (
        <Typography
            component="span"
            style={{
                color: '#BD0000', // Change color to whatever you want
                textDecoration: 'underline',
                cursor: 'pointer',
                fontFamily:"Jost"
            }}
            onClick={onClick}
        >
            {children}
        </Typography>
    );
}

export default LinkTypography;
