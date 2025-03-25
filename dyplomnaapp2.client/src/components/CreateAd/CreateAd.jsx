import NavMenu from "../NavMenu/NavMenu";
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import AdTextfield from "./AdTextfield";
import DateTextfield from "./DateTextfield";
import {useState, useEffect} from "react";
import AddPhotos from "../AddPhotos/AddPhotos";
import CustomBrownButton from "../Advertisement/CustomBrownButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import NumericTextfield from "./NumericTextField";
import { useParams, useNavigate } from 'react-router-dom';
import OneParentCategory from '../Categories/OneParentCategory';
import Grid from '@mui/material/Grid';
import { List } from "@mui/material";
import { profile_edit_route, profile_route } from "../Routing/Routes";


function CreateAd(){
    //const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [payment, setPayment] = useState();
    const [category, setCategory] = useState("");

    const [images, setImages] = useState();



    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                //setLoading(true);
                const response = await fetch(`/categories/withsub/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setAllCategories(data);
                //setLoading(false);
                //setIsUserAuth(true); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getAllCategories();
    }, []);

    const handleCategory = (value) => {
        setCategory(value);
    }

    const handleImagesChange = (newImages) => {
        setImages(newImages);
    };


    const handleTitle = (value) => {
        setTitle(value);
    }
    const handleDeadline = (value) => {
        setDeadline(value);
    }
    const handledDscription = (value) => {
        setDescription(value);
    }
    const handlePayment = (value) => {
        setPayment(value);
    }

    //const [profile, setProfile] = useState();
    const [userId, setUserId] = useState();
    const [categoryProfiles, setCategoryProfiles] = useState([]);

    const navigate = useNavigate();

    //const handleChange = (newValue) => {
    //    setValue(newValue);
    //};

    //console.log("IMAGES FROM CREATED AD:.........", images)

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await fetch('/pingauth');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserId(data.userId);
            //    setIsUserAuth(true); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getUserId();
    }, []);


   

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

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };


    const getFileUrls = async (filenames, adId) => {
        const urls = await Promise.all(filenames.map(async (filename) => {
            const blobUrlEndpoint = `/image/bloburl?name=${encodeURIComponent('ad' + adId.toString() + filename.name)}`;

            try {
                const blobResponse = await fetch(blobUrlEndpoint);

                if (!blobResponse.ok) {
                    throw new Error("Failed to fetch blob URL");
                }

                const blobResponseData = await blobResponse.json();
                console.log("Blob URL response data:", blobResponseData);
                addToDb(blobResponseData.url, adId);
                return blobResponseData.url;
            } catch (error) {
                console.error("Error fetching blob URL:", error);
                return null; // Handle error by returning null or some default value
            }
        }));

        return urls.filter(url => url !== null); // Filter out any null values
    };

    const addToDb = async (imageUrl, adId) => {
        var url = "/addphotos/create/adimage"

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "postImageUrl": imageUrl,
                    "adId": adId
                }),
            });

            if (response.ok) {
                console.log('Ad DB image created successfully');
            } else {
                console.error('Failed to create ad image:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating ad image:', error);
        }
    }

    const uploadImages = async (images, adId) => {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('/image?prefix=ad'+adId.toString(), {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Upload successful:', data);
            //    console.log("IMAGES URL:", imagesURLS);
            }
            else {
                console.error('Upload failed:', response.statusText);
            }
            const imagesURLS = await getFileUrls(images, adId);

        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };





    const createNotifications = async (categoryProfilesArray, adId, title, categoryName) => {
        const urls = await Promise.all(categoryProfilesArray.map(async (item) => {
            try {
                await handleNewAddCreatedNotific(item.userId, title, adId, categoryName);

                //if (!someResponse.ok) {
                //    throw new Error("Failed to createNotifications");
                //}
                //const blobResponseData = await someResponse.json();
                //console.log("Blob URL response data:", blobResponseData);
                //return blobResponseData.url;
            } catch (error) {
                console.error("Error createNotifications:", error);
                return null; // Handle error by returning null or some default value
            }
        }));

        return urls.filter(url => url !== null); // Filter out any null values
    };

    const getProfiles = async (filterCategoryId, adId, title, categoryname) => {
       
        var url = `categoryprofile/profilesbycategory/${filterCategoryId}?excludeUserId=${userId}`
        
            try {
                //setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCategoryProfiles(data);
                createNotifications(data, adId, title, categoryname);
                //setLoading(false);
                //setIsUserAuth(true); // Assuming successful response means user is authenticated
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };


    const handleNewAddCreatedNotific = async (receiverId, title, adId, categoryName) => {
        try {
            const response = await fetch('/request/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "requestText": `Нове оголошення ${title} в категорії ${categoryName}`,
                    "receiverId": receiverId,
                    "adId": adId,
                    "seen": false,
                    "createdAt": getTodayDate()
                }),
            });


            if (!response.ok) {
                throw new Error('Failed to new ad created');
            }
            else {
                console.log("new ad created successfully");
            }
            //const data = await response.json();
            //return data.adId;

        } catch (error) {
            console.error(error);
            throw new Error('Failed to new ad created');
        }
    };





    const createAdvertisement = async () => {
        try {
            if (!title || !description || !payment || !deadline || !category) {
                setError("Заповніть всі поля");
            }
            else {
                setError("");
                const response = await fetch('/adserver/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        authorId: userId,
                        title: title,
                        descriptionAd: description,
                        payment: payment,
                        deadline: deadline ? formatDate(deadline) : '',
                        statusAd: "Відкрите",
                        createdAt: getTodayDate(),
                        categoryId: category.categoryId

                    }),
                });
                console.log("Ad was created successfully");
                //navigate(profile_edit_route);

                if (!response.ok) {
                    throw new Error('Failed to create advertisement');
                }
               
                const data = await response.json();
                uploadImages(images, data.adId);
                getProfiles(category.categoryId, data.adId, title, category.categoryName);

                //return data.adId;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create advertisement');
        }
    };

    // Example usage:
    //const advertisementModel = {
    //    // Your advertisement model data
    //};
    //createAdvertisement(advertisementModel)
    //    .then(data => {
    //        console.log(data); // Advertisement created successfully
    //    })
    //    .catch(error => {
    //        console.error(error); // Failed to create advertisement
    //    });


    const isWideScreen = useMediaQuery("(min-width:1000px)");


    //console.log("CHOSEN CATEGORY", category)

    return(
        <div>
            <NavMenu/>
            <div style={{
                marginTop: 50,
                marginRight:isWideScreen ? "20%" : 0, marginLeft:isWideScreen ? "20%" : 0, alignContent:"center",
                alignItems:"flex-start",
            justifyContent:"center"}}>
                <Typography
                sx={{
                    fontFamily:"Jost",
                    fontWeight:"500",
                    fontSize:{xs:'30px', sm:'30px',md:'35px', lg:'35px', xl:'40px'},
                    color:'#694040'
                }}>
                    Оголошення
                </Typography>
                <AdTextfield label="Заголовок" placeholder="Опишіть запит одним реченням" maxLength={150} maxRows={2} marginTop="2%" name="title" onChange={handleTitle} value={title} />
                <AdTextfield label="Опис" placeholder="Детально опишіть запит" multiline={true} maxLength={2000} maxRows={5} minRows={2} marginTop="2%" name="description" onChange={handledDscription} value={description} />
                <NumericTextfield
                    label="Оплата"
                    placeholder="Вкажіть ціну за роботу в гривнях"
                    maxRows={1}
                    maxLength={20}
                    value={payment}
                    onChange={handlePayment}
                    marginTop="2%"
                    name="payment"
                    defaultValue={0 }
                />
                <DateTextfield label="Дедлайн" placeholder="Вкажіть дату виконання" name="deadline" onChange={handleDeadline} value={deadline} />
                <div style={{ display: "flex" }}>
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "500",
                            fontSize: '20px',
                            color: '#694040'
                        }}
                    >
                        Оберіть категорію для оголошення:
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "700",
                            fontStyle: "italic",
                            fontSize: '20px',
                            color: 'black',
                            marginLeft: "2%"
                        }}
                    >{category.categoryName}</Typography>
                </div>
                <div style={{ border: '2px solid #694040', padding: '10px', borderRadius: "24px" }}>
                    
                <Grid container spacing={2}>
                    {allCategories.map((category, index) => (
                        <Grid item key={category.categoryId} xs={4}>
                        <OneParentCategory
                            
                            oneParentCategoryName={category.categoryName}
                            childCategories={category.subCategoryName}
                                usedCategories={[]}
                                onAdd={handleCategory}
                                isCreateAd={true}
                            maxCategories={1}
                        />
                        </Grid>
                    ))}
                    </Grid>
                </div>

                <Typography>{error}</Typography>
                <AddPhotos userId={userId} onImagesChange={handleImagesChange} />
                    <CustomBrownButton label="Опублікувати" onClick={createAdvertisement} />
            </div>
        </div>
    );

}

export default CreateAd;