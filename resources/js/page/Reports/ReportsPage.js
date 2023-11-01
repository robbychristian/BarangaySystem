import { Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HouseIcon from "@mui/icons-material/House";
import DescriptionIcon from "@mui/icons-material/Description";
import DraftsIcon from "@mui/icons-material/Drafts";
import CustomClickableCard from "../../components/CustomClickableCard";

const ReportsPage = () => {
    return (
        <div className="px-10 py-4">
            <Typography variant="h4" fontWeight={`700`}>
                Reports
            </Typography>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-4">
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`BARANGAY RECORDS`}
                        icon={
                            <AccountBalanceIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                        onClick={() =>
                            window.location.replace("/reports/barangayreports")
                        }
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`RESIDENT RECORDS`}
                        icon={
                            <HouseIcon sx={{ fontSize: 180, color: "#fff" }} />
                        }
                        onClick={() => {
                            window.location.replace("/reports/residentrecords");
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`INCIDENT REPORTS`}
                        icon={
                            <DescriptionIcon
                                sx={{ fontSize: 180, color: "#fff" }}
                            />
                        }
                        onClick={() => {
                            window.location.replace("/reports/incidentreports");
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <CustomClickableCard
                        title={`TRANSACTION RECORDS`}
                        icon={
                            <DraftsIcon sx={{ fontSize: 180, color: "#fff" }} />
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;

if (document.getElementById("ReportsPage")) {
    ReactDOM.render(<ReportsPage />, document.getElementById("ReportsPage"));
}
