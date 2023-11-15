import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { api } from "../../config/api";
import { DataGrid } from "@mui/x-data-grid";

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
const TransactionReports = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (props.user) {
            api.post(`reports/getallpaidtransactions`, {
                user_id: JSON.parse(props.user).id,
            })
                .then((response) => {
                    console.log(response.data);
                    setData(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else {
            api.post("reports/getallpaidtransactions")
                .then((response) => {
                    console.log(response.data);
                    setData(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, []);
    return (
        <div className="px-10 py-4">
            <CustomBackTitle title={`Transaction Records`} url={`/reports`} />
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
    );
};

export default TransactionReports;

if (document.getElementById("TransactionReportsPage")) {
    const element = document.getElementById("TransactionReportsPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <TransactionReports {...props} />,
        document.getElementById("TransactionReportsPage")
    );
}
