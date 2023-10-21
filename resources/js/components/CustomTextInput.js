import { TextField } from "@mui/material";
import React from "react";

const CustomTextInput = ({ label, value, onChangeValue, type, my }) => {
    return (
        <TextField
            className="focus:outline-none outline-none border-none focus:border-none"
            label={label}
            value={value}
            onChange={onChangeValue}
            type={type}
            fullWidth
            style={{
                marginTop: my,
                marginBottom: my,
            }}
        />
    );
};

export default CustomTextInput;
