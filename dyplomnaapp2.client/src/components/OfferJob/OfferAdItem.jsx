import PropTypes from 'prop-types';
import { Card } from "reactstrap";
import { Avatar, CardActionArea, CardContent, CardMedia, Divider, Icon, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";

function OfferAdItem(props) {

    const { adId, payment, title, description, deadline, onSelect } = props
    return (
        <>
            <Card padding="2%" sx={{ maxWidth: "100%", margin: '10%' }}>
                <CardActionArea onClick={() => onSelect({ adId, title })}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            
                            <div
                                style={{
                                    marginLeft: '16px'
                                }}>

                                <Typography gutterBottom variant="h5" component="div"
                                    sx={{
                                        maxWidth: "60%",
                                        fontFamily: 'Jost, sans-serif'
                                    }}>
                                    {title}
                                </Typography>
                               
                                    <Typography variant="body2" color="text.secondary"
                                        sx={{
                                            fontFamily: 'Jost, sans-serif'
                                        }}>
                                        {description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary"
                                        sx={{
                                            fontFamily: 'Jost, sans-serif',
                                            marginTop: '12px'
                                        }}>
                                        Дедлайн: {deadline}
                                    </Typography>
                            </div>
                        </div>

                       
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                }}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontFamily: 'Jost, sans-serif',
                                        fontWeight: '500',
                                        color:"#BD0000"
                                    }}>
                                    {payment} грн
                                </Typography>
                            
                            </div>



                    </CardContent>
                </CardActionArea>
                
            </Card>
            <Divider />
        </>
  );
}
OfferAdItem.propTypes = {
    adId: PropTypes.number.isRequired,
    payment: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    onSelect: PropTypes.func
};

export default OfferAdItem;