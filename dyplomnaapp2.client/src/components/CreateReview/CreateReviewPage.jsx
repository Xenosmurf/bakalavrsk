import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState, useSyncExternalStore } from 'react'
import NavMenu from '../NavMenu/NavMenu';
import { useParams, useNavigate } from 'react-router-dom';
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import AdTextfield from "../CreateAd/AdTextfield";
import useMediaQuery from "@mui/material/useMediaQuery";


function CreateReviewPage() {

    const [value, setValue] = useState(0);
    const [userId, setUserId] = useState();
    const [ad, setAd] = useState();
    const [reviewText, setReviewText] = useState("");
    const [error, seterror] = useState("");

    const handlereviewText = (value) => {
        setReviewText(value);
    }

    let { reviewAdid } = useParams();

    const isWideScreen = useMediaQuery("(min-width:1000px)");

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserId(data.userId);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, []);

    useEffect(() => {
        const getAdInfo = async () => {
            try {
                const response = await fetch(`/adserver/adwithimages/${reviewAdid}`);
                console.log("reviewAdid:", reviewAdid)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setAd(data);
                //setAuthor(data.userId);
                //setLoading(false); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getAdInfo();
    }, [reviewAdid]);

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');
        const ss = String(today.getSeconds()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
    };

    //console.log("value", value);
    //console.log("value", value);

    const  createReviewAsEmployer = async () => {
        const url = '/reviewEmplo/create'; // Replace with your actual API URL

        try {
            if (!value || !reviewText) {
                seterror("RATING");
            }
            else {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "createdAt": getTodayDate(),
                        "reviewText": reviewText,
                        "rating": value,
                        "adId": ad.adId,
                        "authorExpertId": userId
                    })
                });


                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Failed to create review: ${errorMessage}`);
                }

                //const result = await response.json();
                //console.log('Review created successfully:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const  createReviewAsExpert = async () => {
        const url = '/reviewExp/create'; // Replace with your actual API URL

        try {
            if (!value || !reviewText) {
                seterror("RATING");
            }
            else {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "createdAt": getTodayDate(),
                        "reviewText": reviewText,
                        "rating": value,
                        "adId": ad.adId,
                        "authorEmployerId": userId
                    })
                });


                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Failed to create review: ${errorMessage}`);
                }

                //const result = await response.json();
                //console.log('Review created successfully:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    if (!ad) {
        return null
    }

  return (
      <>
          <NavMenu />
          <div style={{ marginTop: 50, marginRight: isWideScreen ? "20%" : 0, marginLeft: isWideScreen ? "20%" : 0, alignContent: "center" }} >
              <Box
                  sx={{
                      '& > legend': { mt: 2 },
                  }}
              >
                  <div style={{ padding:"5%" }}/>
                  <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                          setValue(newValue);
                      }}
                  />
                  <div style={{ padding: "2%" }} />

                  <AdTextfield label="Текст відгуку" placeholder="" maxLength={200} maxRows={2} minRows={4} multiline={true} marginTop="2%" onChange={handlereviewText} value={reviewText} />
                  <div style={{ padding: "2%" }} />
                  {userId == ad.authorExpertId ? (
                      <CustomBrownButton label="залишити відгук" onClick={createReviewAsExpert} />

                  ) : (
                      <CustomBrownButton label="залишити відгук" onClick={createReviewAsEmployer} />

                  )}
                  {console.log(userId == ad.authorExpertId) }
                  <Typography>{error}</Typography>

              </Box>
          </div>

      </>
  );
}

export default CreateReviewPage;