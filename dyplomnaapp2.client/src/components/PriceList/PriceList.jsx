import Typography from "@mui/material/Typography";
import {Grid, List} from "@mui/material";
import PriceItem from "./PriceItem";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";



function PriceList(props) {

    const userId = props.userId;
    const [priceList, setpriceList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAdInfo = async () => {
            try {
                const response = await fetch(`/price/list/${userId}`);
                console.log("Price:", userId)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setpriceList(data);
                setLoading(false); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch pricelist:', error);
            }
        };

        getAdInfo();
    }, [userId]);


    //const priceList = props.priceList;
    if (loading) {
        return (
            <div>LOADING...</div>
        )
    }


    return(
        <Grid container columns ={{xs: 8, sm: 8, md: 12, lg: 12, xl:12}}>
            <Grid item xs={2} sm={0}/>
            <Grid item xs={8}>
                <List>
                    {priceList.map((item) => 
                       ( <PriceItem
                            key={item.priceItemId}
                            name={item.priceName}
                            payment={item.payment}
                    />
                    ))}
                </List>
            </Grid>
            <Grid item xs={2} sm={0}/>
        </Grid>
    );
}


PriceList.propTypes = {
    userId: PropTypes.string.isRequired,
    //priceList: PropTypes.arrayOf(PropTypes.shape({
    //    priceItemId: PropTypes.number.isRequired,
    //    priceName: PropTypes.string.isRequired,
    //    payment: PropTypes.number.isRequired,
    //    userId: PropTypes.string.isRequired
    //})).isRequired
};

export default PriceList