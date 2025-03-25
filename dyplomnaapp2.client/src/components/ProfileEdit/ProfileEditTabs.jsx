import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {tabsClasses} from "@mui/material";
// import "../fonts.css"
import AdList from "../AdList/AdList";
import Portfolio from "../Portfolio/Portfolio";
import PriceList from "../PriceList/PriceList";
import StyledTab from "../Profile/StyledTab";
import PostList from "../Profile/PostList";
import AddPhotos from "../AddPhotos/AddPhotos";
import PriceListEdit from "../PriceListEdit/PriceListEdit";
import CategoriesEditProfile from "./CategoriesEditProfile";
import CreatePost from "../CreatePost/CreatePost";
import NotificationPage from "../NotificationPage/NotificationPage";
import AddPhotosPortfolio from '../AddPhotos/AddPhotosPortfolio';
import Categories from '../Categories/Categories';




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
                    {children}
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

export default function ProfileEditTabs(props) {
    const { userId } = props;
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box
            sx={{
                width: '100%',
                // flexGrow: 1,
            }}
        >
            <AppBar position="static"
                    sx={{
                        fontFamily:'Jost',
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
                    <StyledTab label="Категорії" {...a11yProps(4)} />
                    {/*<StyledTab label="Відгуки як на фахівця" {...a11yProps(5)} />*/}
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
                    {/*<Portfolio/>*/}
                    <AddPhotosPortfolio userId={userId} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {/*Прайслист*/}
                    <PriceListEdit userId={userId} />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    {/*Пости*/}
                    <PostList userId={userId} />
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction} >
                    {/*<CategoriesEditProfile/>*/}
                    {/*<CreatePost/>*/}
                    {/*<NotificationPage/>*/}
                    <Categories userId={userId} />
                </TabPanel>

            </SwipeableViews>
        </Box>
    );
}

ProfileEditTabs.propTypes = {
    userId: PropTypes.string.isRequired
};
