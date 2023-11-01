import { Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import CustomClickableCard from "../../components/CustomClickableCard";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TodayIcon from "@mui/icons-material/Today";

const ServicesPage = () => {
    return (
        <div className="px-10 py-4">
            <Typography variant="h4" fontWeight={"700"}>
                E-Services
            </Typography>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-4">
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`DOCUMENT SUBMISSION`}
                        icon={
                            <FolderIcon sx={{ fontSize: 180, color: "#fff" }} />
                        }
                        onClick={() =>
                            window.location.replace(
                                "/services/documentsubmission"
                            )
                        }
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`BLOTTER REPORTS`}
                        icon={
                            <InsertDriveFileIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                        onClick={() => {
                            window.location.replace("/services/blotterreport");
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`FACILITIES, EQUIPMENT AND VEHICULAR RESERVATIONS`}
                        icon={
                            <ScheduleIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                        onClick={() => {
                            window.location.replace("/services/reservation");
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`CLINIC`}
                        icon={
                            <CalendarMonthIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`TRANSACTIONS`}
                        icon={
                            <ReceiptLongIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`APPOINTMENT`}
                        icon={
                            <TodayIcon sx={{ fontSize: 180, color: "#fff" }} />
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;

if (document.getElementById("ServicesPage")) {
    ReactDOM.render(<ServicesPage />, document.getElementById("ServicesPage"));
}
