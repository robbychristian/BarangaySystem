import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { DataGrid } from "@mui/x-data-grid";
import { data } from "autoprefixer";
import { api } from "../../config/api";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: true,
    },
];
const UserManagementPage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get("usermanagement/getallusers")
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);
    return (
        <div className="px-10 py-4">
            <CustomBackTitle title={"User Management"} url={"/home"} />
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

export default UserManagementPage;

if (document.getElementById("UserManagementPage")) {
    ReactDOM.render(
        <UserManagementPage />,
        document.getElementById("UserManagementPage")
    );
}
