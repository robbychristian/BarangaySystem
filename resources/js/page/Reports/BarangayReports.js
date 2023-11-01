import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { api } from "../../config/api";
import InfoIcon from "@mui/icons-material/Info";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "additional_info",
        headerName: "Document Type",
        width: 150,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.value.document_type;
        },
    },
    {
        field: "personal_info",
        headerName: "Email",
        width: 160,
        editable: true,
        renderCell: (cellValue) => {
            if (cellValue.value.name) {
                return cellValue.value.email;
            }
            return "";
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 160,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.row.personal_info.name;
        },
    },
    {
        field: "actions",
        headerName: "Actions",
        width: 250,
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
                    {cellValue.row.payment_info && (
                        <Button
                            onClick={() => {
                                console.log("test");
                            }}
                        >
                            <CreditCardIcon />
                        </Button>
                    )}
                </>
            );
        },
    },
];

const BarangayReports = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("services/getalldocuments")
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <div className="px-10 py-4">
            <div className="flex flex-items-center space-x-4">
                <Button onClick={() => window.location.replace("/reports")}>
                    <ArrowBackIcon
                        sx={{ fontSize: 30 }}
                        className="cursor-pointer text-sky-600"
                    />
                </Button>
                <Typography variant="h4" fontWeight={"700"}>
                    Barangay Records
                </Typography>
            </div>
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

export default BarangayReports;

if (document.getElementById("BarangayReportsPage")) {
    ReactDOM.render(
        <BarangayReports />,
        document.getElementById("BarangayReportsPage")
    );
}
