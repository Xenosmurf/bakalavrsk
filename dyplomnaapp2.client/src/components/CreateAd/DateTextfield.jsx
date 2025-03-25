import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import uk from 'date-fns/locale/uk';
import styled from "styled-components";

const StyledLabel = styled.label`
  font-family: "Jost", sans-serif;
  margin-right: 50px;
  font-size: 20px;
`;

const StyledDatePickerContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
    .react-datepicker__input-container input::placeholder {
      //padding-left: 10px;
    },
  .react-datepicker-wrapper,
  .react-datepicker__input-container input {
    width: 200px; 
    height: 40px; 
    font-family: "Jost", sans-serif; 
    font-size: 16px; 
    border-radius: 16px;
    padding-left: 10px;
  }
`;

registerLocale('uk', uk);

function DateTextfield(props) {
    const [selectedDate, setSelectedDate] = useState(null);
    {/*selected={selectedDate}*/ }
    {/*onChange={(date) => setSelectedDate(date)}*/ }


    return (
        <StyledDatePickerContainer>
            <StyledLabel>{props.label}</StyledLabel>
            <DatePicker
                selected={props.value}

                onChange={props.onChange}

                placeholderText={props.placeholder}
                dateFormat="yyyy-MM-dd"
                className="date-picker"
                locale="uk"
                style={{
                    fontFamily:"Jost",
                }}
            />
        </StyledDatePickerContainer>
    );
}

export default DateTextfield;
