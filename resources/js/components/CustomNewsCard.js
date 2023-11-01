import { Card, Typography } from "@mui/material";
import React from "react";
import testImage from "../../../public/image/news/News Title.tv-patrol_2022-01-17_16-37-09.jpg";

const CustomNewsCard = ({ title, description, image }) => {
    return (
        <Card variant="outlined" sx={{ borderWidth: 2, borderColor: "#333" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 px-6">
                <div className="col-span-1 h-full">
                    <div className="flex flex-col justify-center items-center h-full">
                        <div className="text-2xl font-bold">{title}</div>
                        <img src={testImage} className="my-4" />
                    </div>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    <Typography variant="body1">{description}</Typography>
                </div>
            </div>
        </Card>
    );
};

export default CustomNewsCard;
