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
        field: "name",
        headerName: "Name",
        width: 150,
        editable: true,
    },
    {
        field: "email",
        headerName: "Email",
        width: 160,
        editable: true,
    },
    {
        field: "created_at",
        headerName: "Date Joined",
        width: 160,
        editable: true,
        renderCell: (cellValue) => {
            console.log(cellValue);
            if (cellValue.value) {
                return moment(cellValue.value).format("LL");
            }
            return "";
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
                </>
            );
        },
    },
];

const ResidentRecords = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("services/getallresidents")
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);
    return (
        <div className="px-10 py-4">
            <CustomBackTitle title={`Resident Records`} url={"/reports"} />
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

export default ResidentRecords;

if (document.getElementById("ResidentRecordsPage")) {
    const element = document.getElementById("ResidentRecordsPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <ResidentRecords {...props} />,
        document.getElementById("ResidentRecordsPage")
    );
}
