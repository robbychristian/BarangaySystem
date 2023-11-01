import { Button, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomBackTitle = ({ title, url }) => {
    return (
        <div className="flex flex-items-center space-x-4">
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
    );
};

export default CustomBackTitle;
