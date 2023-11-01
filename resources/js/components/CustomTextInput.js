import { TextField } from "@mui/material";
import React from "react";

const CustomTextInput = ({
    label,
    value,
    onChangeValue,
    type,
    my,
    multiline,
    isHalf,
}) => {
    return (
        <TextField
            className="focus:outline-none outline-none border-none focus:border-none"
            label={label}
            value={value}
            onChange={onChangeValue}
            type={type}
            fullWidth={isHalf ? false : true}
            style={{
                marginTop: my,
                marginBottom: my,
            }}
            multiline={multiline}
            rows={multiline ? "4" : null}
        />
    );
};

export default CustomTextInput;
