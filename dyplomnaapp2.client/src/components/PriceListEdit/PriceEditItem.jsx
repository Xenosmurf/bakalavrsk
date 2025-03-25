import AdTextfield from "../CreateAd/AdTextfield";
import { useState, useEffect } from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import NumericTextfield from "../CreateAd/NumericTextField";

function PriceEditItem({ defaultPrice, onDelete, valueName, onUpdate, ...props }){
    const [value, setValue] = useState(defaultPrice);

    const [defaultValueName, setDefaultValueName] = useState(valueName);

    useEffect(() => {
        onUpdate({
            payment: value,
            priceName: defaultValueName,
        });
    }, [defaultValueName, value, onUpdate]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleStrChange = (newValue) => {
        setDefaultValueName(newValue);
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    return(
       <div
       style={{
           display:"flex",
           padding:"1%"
       }}>
           <div
           style={{
               width:"80%"
                }}>
                <AdTextfield placeholder="Назва послуги" maxLength={100} maxRows={2} multiline defaultValue={props.valueName} value={defaultValueName} onChange={handleStrChange} />
           </div>
           <div
               style={{
                   width:"20%"
                }}>
                <NumericTextfield
                   placeholder="Оплата"
                   maxRows={1}
                   maxLength={20}
                   value={value}
                   onChange={handleChange}
                   // defaultValue={Number(props.valuePrice)}
               />
           </div>
           {/*<IconButton*/}
           {/*onClick={handleDelete}>*/}
           {/*    <DeleteIcon/>*/}
           {/*</IconButton>*/}
       </div>
    )
}

export default PriceEditItem