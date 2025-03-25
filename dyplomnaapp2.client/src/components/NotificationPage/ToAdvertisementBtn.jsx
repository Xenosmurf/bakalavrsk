import Button from "@mui/material/Button";
import ArticleIcon from '@mui/icons-material/Article';
import PropTypes from 'prop-types';

function ToAdvertisementBtn(props) {
    const { onClick,  } = props

  return (
      <Button
          component="a"
          onClick={onClick}
          sx={{
              color: "#694040",
              backgroundColor: "#FFF",
              width: { lg: "80px", md: "70px", sm: "60px", xs: "50px" },
              height: "80px",
              fontFamily: "Jost",
              fontWeight: "medium",
              fontSize: { lg: "20px", md: "16px" },
              textTransform: "none",
              borderRadius: "24px",
              title: "GTht",
              "&:hover": {
                  color: "#E0CECE",
                  title: "fghjk",
                  backgroundColor: "#FFF",

              },
          }}
      >
          <ArticleIcon

              sx={{
                  height: { lg: "80px", md: "70px", sm: "60px", xs: "50px" },
                  width: { lg: "80px", md: "70px", sm: "60px", xs: "50px" },
              }} />
      </Button>
  );
}

ToAdvertisementBtn.propTypes = {
    //userId: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default ToAdvertisementBtn;