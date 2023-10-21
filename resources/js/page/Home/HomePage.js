import { Card, Typography } from "@mui/material";
import React from "react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const HomePage = () => {
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
    return (
        <div className="px-10 py-4">
            <CustomCarousel />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-1">
                    <Bar
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: "Bar Chart",
                                },
                            },
                        }}
                        data={sampleData}
                    />
                </div>
                <div className="col-span-1">
                    <Bar
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: "Bar Chart",
                                },
                            },
                        }}
                        data={sampleData}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;

if (document.getElementById("HomePage")) {
    ReactDOM.render(<HomePage />, document.getElementById("HomePage"));
}
