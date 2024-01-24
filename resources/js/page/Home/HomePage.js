import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomCarousel from "../../components/CustomCarousel";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { api } from "../../config/api";
import CustomNewsCard from "../../components/CustomNewsCard";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const HomePage = () => {
    const [announcement, setAnnouncement] = useState({});
    const [news, setNews] = useState({});
    const labels = ["January", "February", "March", "April", "May", "June"];
    const sampleData = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: [30, 20, 42, 11, 56, 22],
                backgroundColor: "rgba(53, 162, 235)",
            },
        ],
    };

    useEffect(() => {
        api.get("announcements/getlastestannouncement")
            .then((response) => {
                setAnnouncement(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
        api.get("announcements/getlatestnews").then((response) => {
            console.log(response.data)
            setNews(response.data);
        });
    }, []);

    return (
        <div className="px-10 py-4">
            <Card
                style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 8,
                    paddingBottom: 8,
                }}
                variant="outlined"
            >
                <Typography
                    variant="h4"
                    fontWeight={`700`}
                    textAlign={`center`}
                >
                    Latest Announcements
                </Typography>
                <Typography variant="h6" fontWeight={"bold"}>
                    {announcement && announcement.announcement_title}
                </Typography>
                <Typography variant="body1">
                    {announcement && announcement.announcement_description}
                </Typography>
                <div className="flex justify-center items-center"></div>
            </Card>
            <Card
                style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 8,
                    paddingBottom: 8,
                    marginTop: 20
                }}
                variant="outlined"
            >
                <Typography
                    variant="h4"
                    fontWeight={`700`}
                    textAlign={`center`}
                >
                    Latest News
                </Typography>
                <CustomNewsCard
                hasBorder={false}
                    title={news.news_title}
                    description={news.news_description}
                    // image={require("../../../../../public/image/news/News Title.tv-patrol_2022-01-17_16-37-09.jpg")}
                />
            </Card>
        </div>
    );
};

export default HomePage;

if (document.getElementById("HomePage")) {
    ReactDOM.render(<HomePage />, document.getElementById("HomePage"));
}
