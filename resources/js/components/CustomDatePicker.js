import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React from "react";

const CustomDatePicker = ({ label, value, onChangeValue }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
                label={label}
                value={value}
                onChange={onChangeValue}
                fullWidth
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
