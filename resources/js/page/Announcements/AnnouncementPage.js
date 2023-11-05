import { Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import CustomClickableCard from "../../components/CustomClickableCard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EventIcon from "@mui/icons-material/Event";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import CampaignIcon from "@mui/icons-material/Campaign";

const AnnouncementPage = () => {
    return (
        <div className="px-10 py-4">
            <Typography variant="h4" fontWeight={`700`}>
                Announcements
            </Typography>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-4">
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`BARANGAY NEWS`}
                        icon={
                            <NewspaperIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                        onClick={() =>
                            window.location.replace(
                                "/announcements/barangaynews"
                            )
                        }
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`UPCOMING EVENTS`}
                        icon={
                            <EventIcon sx={{ fontSize: 180, color: "#fff" }} />
                        }
                        onClick={() => {
                            window.location.replace(
                                "/announcements/upcomingevents"
                            );
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`PAST EVENTS`}
                        icon={
                            <EventRepeatIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                        onClick={() => {
                            window.location.replace(
                                "/announcements/pastevents"
                            );
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`CREATE ANNOUNCEMENT`}
                        icon={
                            <CampaignIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                        onClick={() => {
                            window.location.replace(
                                "/announcements/createannouncement"
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnnouncementPage;

if (document.getElementById("AnnouncementPage")) {
    ReactDOM.render(
        <AnnouncementPage />,
        document.getElementById("AnnouncementPage")
    );
}
