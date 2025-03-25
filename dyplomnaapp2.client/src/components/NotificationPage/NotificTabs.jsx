import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StyledTab from "../Profile/StyledTab";
import { styled } from '@mui/material/styles';
import NotificationList from './NotificationList';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#694040',
    },
});

export default function NotificTabs(props) {
    const {userId } = props
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}
                    sx={{
                        fontFamily: 'Jost, sans-serif',
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
                        
                    }}
                >
                    <StyledTab label="Unread" {...a11yProps(0)} />
                    <StyledTab label="Read" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <NotificationList receiverId={userId} read={true}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <NotificationList receiverId={userId} read={false} />
            </CustomTabPanel>
           
        </Box>
    );
}

NotificTabs.propTypes = {
    userId: PropTypes.string.isRequired,
};