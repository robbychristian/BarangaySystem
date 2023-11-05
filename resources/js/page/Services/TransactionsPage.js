import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../config/api";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.row.owned_by.user.name;
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
        editable: true,
        renderCell: (cellValue) => {
            return cellValue.row.owned_by.user.email;
        },
    },
    {
        field: "price",
        headerName: "Price",
        width: 150,
        editable: true,
        renderCell: (cellValue) => {
            return `₱${cellValue.row.payment_price}`;
        },
    },
];

const TransactionsPage = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        api.post("services/getallunpaidtransactions")
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
            <CustomBackTitle
                title={`Transactions`}
                url={() => window.location.replace("/services")}
            />
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

export default TransactionsPage;

if (document.getElementById("TransactionsPage")) {
    ReactDOM.render(
        <TransactionsPage />,
        document.getElementById("TransactionsPage")
    );
}
