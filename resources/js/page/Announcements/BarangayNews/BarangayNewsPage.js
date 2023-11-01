import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import CustomNewsCard from "../../../components/CustomNewsCard";
import { api } from "../../../config/api";

const BarangayNewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        api.get("announcements/getallnews")
            .then((response) => {
                setNews(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <div className="px-10 py-4">
            <div className="flex items-center space-x-4">
                <Button
                    onClick={() => window.location.replace("/announcements")}
                >
                    <ArrowBackIcon
                        sx={{ fontSize: 30 }}
                        className="cursor-pointer text-sky-600"
                    />
                </Button>
                <Typography variant="h4" fontWeight={"700"}>
                    Barangay News
                </Typography>
            </div>
            <div id="NewsContainer" className="py-6">
                {news.length > 0 &&
                    news.map((item, index) => {
                        return (
                            <CustomNewsCard
                                key={index}
                                title={item.news_title}
                                description={item.news_description}
                                // image={require("../../../../../public/image/news/News Title.tv-patrol_2022-01-17_16-37-09.jpg")}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default BarangayNewsPage;

if (document.getElementById("BarangayNewsPage")) {
    ReactDOM.render(
        <BarangayNewsPage />,
        document.getElementById("BarangayNewsPage")
    );
}
