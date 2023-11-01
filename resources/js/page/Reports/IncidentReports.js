import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { api } from "../../config/api";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "incidentType",
        headerName: "Incident Type",
        width: 150,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.row.incident_type;
        },
    },
    {
        field: "reportedBy",
        headerName: "Reported By",
        width: 150,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.row.reporting_person.name;
        },
    },
    {
        field: "suspectData",
        headerName: "Suspect Name",
        width: 150,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.row.suspect_data.name;
        },
    },
    {
        field: "victimData",
        headerName: "Victim Name",
        width: 150,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.row.victim_data.name;
        },
    },
    {
        field: "incidentPlace",
        headerName: "Place of Incident",
        width: 180,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.row.incident_narrative.place_of_incident;
        },
    },
    {
        field: "incidentTime",
        headerName: "Time of Incident",
        width: 200,
        editable: true,
        renderCell: (cellValue) => {
            return moment(
                cellValue.row.incident_narrative.date_time_incident
            ).format("LL hh:mm A");
        },
    },
    {
        field: "reportTime",
        headerName: "Time of Report",
        width: 200,
        editable: true,
        renderCell: (cellValue) => {
            return moment(
                cellValue.row.reporting_person.date_time_report
            ).format("LL hh:mm A");
        },
    },
    {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (cellValue) => {
            return (
                <>
                    <Button
                        onClick={() => {
                            console.log("test");
                        }}
                    >
                        <InfoIcon />
                    </Button>
                </>
            );
        },
    },
];

const IncidentReports = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("reports/getallblotterreports")
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <div className="px-10 py-4">
            <CustomBackTitle title={`Incident Reports`} url={"/reports"} />
            <div className="my-5">
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default IncidentReports;

if (document.getElementById("IncidentReportsPage")) {
    ReactDOM.render(
        <IncidentReports />,
        document.getElementById("IncidentReportsPage")
    );
}
