import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationItem from "../NotificationPage/NotificationItem";
import {alpha, tabsClasses} from "@mui/material";
import StyledTab from "./StyledTab";
import "../fonts.css"
import AdList from "../AdList/AdList";
import Portfolio from "../Portfolio/Portfolio";
import ReviewList from "../Review/ReviewList";
import PostList from "./PostList";
import PriceList from "../PriceList/PriceList";




function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs(props) {
    const { userId } = props;

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [portfolioImages, setPortfolioImages] = useState([]);


    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch(`/portfolio/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                //console.log("DATA:", data);
                setPortfolioImages(data);
                // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, [userId]);


    return (
        <Box
            sx={{
            //width: '100%',
             flexGrow: 1,
            }}
        >
            <AppBar position="static"
            sx={{
                fontFamily: 'Jost',
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="scrollable"
                    aria-label="full width tabs example"
                    scrollButtons={true}
                    sx={{
                        fontFamily:'Jost, sans-serif',
                        backgroundColor: '#E0CECE',
                        // padding:'1px',

                        '& .MuiTab-root': { // Selecting the root element of each tab
                            fontFamily: 'Jost, sans-serif', // Change the font family
                            fontWeight: 'bold', // Optionally, change the font weight
                            fontSize: '16px', // Optionally, change the font size
                            color: 'black', // Optionally, change the font color
                            '& .MuiTabs-indicator': {
                                // display: 'flex',
                                justifyContent: 'center',
                                color: '#694040',
                            },
                        },
                            [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 1},
                    },
                    }}
                >
                    <StyledTab label="Оголошення" {...a11yProps(0)}/>
                    <StyledTab label="Портфоліо" {...a11yProps(1)} />
                    <StyledTab label="Прайслист" {...a11yProps(2)} />
                    <StyledTab label="Пости" {...a11yProps(3)} />
                    <StyledTab label="Відгуки як на замовника" {...a11yProps(4)} />
                    <StyledTab label="Відгуки як на фахівця" {...a11yProps(5)} />
                    <StyledTab label="Виконані роботи" {...a11yProps(6)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {/*<NotificationItem/>*/}
                    <AdList userId={userId} author={true} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Portfolio portfolioImages={portfolioImages} isProfile={true} />
                    {/*{console.log(portfolioImages)}*/}
                    {/*<MyGallery/>*/}
                    {/*<div id="gal"></div>*/}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {/*Прайслист*/}
                    <PriceList userId={userId} />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    {/*Пости*/}
                    <PostList userId={userId} />
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <ReviewList isExpert={false} userId={userId} />
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                    <ReviewList isExpert={true} userId={userId} />
                </TabPanel>
                <TabPanel value={value} index={6} dir={theme.direction}>
                    <AdList userId={userId} author={false} />
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}

FullWidthTabs.propTypes = {
    userId: PropTypes.string.isRequired
};
