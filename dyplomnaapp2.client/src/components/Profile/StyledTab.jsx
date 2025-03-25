import { Tab } from '@mui/material';
import "../fonts.css"

const StyledTab = (props) => {
    return (
        <Tab
            sx={{
                '&.MuiTab-root': {
                    fontFamily: 'Jost, sans-serif',
                },
            }}
            {...props}
        />
    );
};

export default StyledTab;
