import { Button, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomBackTitle = ({ title, url, hasButton, onClick, label }) => {
    return (
        <div className="flex items-center justify-between space-x-4">
            <div className="flex">
                <Button onClick={() => window.location.replace(url)}>
                    <ArrowBackIcon
                        sx={{ fontSize: 30 }}
                        className="cursor-pointer text-sky-600"
                    />
                </Button>
                <Typography variant="h4" fontWeight={"700"}>
                    {title}
                </Typography>
            </div>
            {hasButton && (
                <Button onClick={onClick} variant="contained">
                    {label}
                </Button>
            )}
        </div>
    );
};

export default CustomBackTitle;
