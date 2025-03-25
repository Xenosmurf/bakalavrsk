import {Grid, IconButton, List} from "@mui/material";
import PriceEditItem from "./PriceEditItem";
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

const generateTempKey = () => `${Date.now()}-${Math.random()}`;

function PriceListEdit(props) {

    const {userId} = props
    const [initialPricesFromDB, setInitialPricesFromDB] = useState([]);
    const [loading, setLoading] = useState(true);

    const [priceItems, setPriceItems] = useState([]);
    const handleSave = () => {
        //console.log("FINAL PRICES:", priceItems) 
        deletePrices(userId);
    };

    //data.map(item => ({ ...item, key: generateTempKey() })));
    const handleUpdateItem = (index, updatedItem) => {
        // Update the price item at the given index with the updated data
        updatedItem.payment = parseInt(updatedItem.payment, 10);
        setPriceItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index] = updatedItem;

            return updatedItems.map(item => ({...item, userId: userId}));
        });
    };

     function deletePrices(userId) {
 
        const url = `/price/deleteall/${userId}`;

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
                    throw new Error(`Failed to delete PriceItemModel entries for UserId: ${userId}`);
                }
                savePrices(userId);
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
     function savePrices(userId) {
        const url = `/price/createall/${userId}`;

        // Define the request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(priceItems) // Convert the list of price items to JSON
           
        };
        console.log(JSON.stringify(priceItems));
        // Send the fetch request
         fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to create PriceItemModel entries for UserId: ${userId}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the response data
            })
            .catch(error => {
                console.error(error); // Log any errors
            });
    }

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch(`/price/list/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setInitialPricesFromDB(data);
                setLoading(false); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, [userId]);


    //const [items, setItems] = useState(initialPricesFromDB);

    const addItemToList = () => {
        const newItem = {
            priceItemId: generateTempKey(), priceName: '', payment: 0, userId: { userId }
        };
        setInitialPricesFromDB(prevItems => [...prevItems, newItem]);
    };

    //const deleteItem = (index) => {
    //    setInitialPricesFromDB(prevItems => prevItems.filter((item, i) => i !== index));
    //    console.log("Was deleted element with index:", index)
    //};

    const deleteItem = (index) => {
        console.log("Deleting item at index:", index);
        setLoading(true);
        setInitialPricesFromDB(prevItems => {
            console.log("Previous items:", prevItems);
            // Create a copy of the array
            const newItems = [...prevItems];
            // Remove the item at the specified index
            newItems.splice(index, 1);
            console.log("New items:", newItems);
            setLoading(false)
            return newItems;
        });

        setPriceItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);

            return updatedItems;
        });
    };


    if (loading) {
        return (
            <div>LOADING....</div>
        )
    }

     //public int PriceItemId { get; set; }
     //   public string PriceName { get; set; }
     //   public int Payment { get; set; }
     //   public string UserId { get; set; }
    //console.log("initialPricesFromDB:", initialPricesFromDB);


    return(
        <div>
            <div
                style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                <CustomBrownButton label="зберегти" onClick={handleSave} />
            </div>
            <List>
                {initialPricesFromDB.map((item, index) => (
                    <div key={item.priceItemId + index}>
                        <PriceEditItem
                            valueName={item.priceName}
                            defaultPrice={item.payment}
                            onUpdate={(updatedItem) => handleUpdateItem(index, updatedItem)}
/>
                     <IconButton
                            onClick={() => deleteItem(index)}>
                           <DeleteIcon/>
                     </IconButton>
                    </div>
                ))}
            </List>
            <div
            style={{
                display:"flex",
                justifyContent:"center"
            }}>
                <IconButton
                    onClick={addItemToList}
                sx={{
                    display:"flex",
                    height:"50px",
                    width:"50px",
                    alignSelf:"flex-end",
                }}>
                    <AddIcon
                        fontSize={"large"}
                        sx={{
                            height:"50px",
                            width:"50px",
                            color:"#694040",
                            fontWeight:"600"

                        }}/>
                </IconButton>
            </div>
        </div>
    )
}

PriceListEdit.propTypes = {
    userId: PropTypes.string.isRequired,

    //adId: PropTypes.number.isRequired,
    //payment: PropTypes.number.isRequired,
    //title: PropTypes.string.isRequired,
    //avatarURL: PropTypes.string,
    //username: PropTypes.string.isRequired,
    //statusAd: PropTypes.string.isRequired,
    //deadline: PropTypes.string.isRequired,
};
export default PriceListEdit
