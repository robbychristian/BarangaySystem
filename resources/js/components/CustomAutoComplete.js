import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const CustomAutoComplete = ({ options, value, onChange }) => {
    return (
        <Autocomplete
            options={options}
            onChange={onChange}
            value={value}
            renderInput={(params) => <TextField {...params} label="Name" />}
            fullWidth
        />
    );
};

export default CustomAutoComplete;
