import {Box, Card, CardMedia, List} from "@mui/material";
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";


const ImageListSm  = (props) => {
    // props.itemData = [];
     

    const location = useLocation();
    const currentPath = location.pathname;

    var isProfile = props.isProfile;

    var itemData = [];

    if (isProfile) {
        itemData = props.portfolioImages;
    }
    else {
        itemData = props.itemData;
    }
    return(
        <Box sx={{
            // maxHeight: "xs",
            maxHeight: {xl:'550px',md:'450px', sm:'400px', xs:'400px'},
            overflowY: 'auto' }}>
        <List>
                {itemData.map((item) => (
                    isProfile ? (
                    <Card
                            sx={{ maxWidth: 500, maxHeight: 450 }} key={item.portfolioImageId}
                        >
                            <CardMedia
                                component="img"
                                height="450"
                                width="500"
                                image={item.portfolioImageUrl}
                                sx={{ objectFit: "contain" }}
                            />
                        </Card>
                    ) : (
                        <Card
                            sx={{ maxWidth: 500, maxHeight: 450 }} key={item.postImageId}
                        >
                            <CardMedia
                                component="img"
                                height="450"
                                width="500"
                                image={item.postImageUrl}
                                sx={{ objectFit: "contain" }}
                            />
                        </Card>
                    )

                ))}
        </List>
        </Box>
    );
}
ImageListSm.propTypes = {
    isProfile: PropTypes.bool.isRequired,

    itemData: PropTypes.arrayOf(PropTypes.shape({
        postImageId: PropTypes.string,
        postImageUrl: PropTypes.string
    })),

    portfolioImages: PropTypes.arrayOf(PropTypes.shape({
        portfolioImageId: PropTypes.string,
        portfolioImageUrl: PropTypes.string,
        userPortfolioId: PropTypes.string,
    })),
};



export default ImageListSm;