import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../config/api";
import { Box, Button, Modal, Typography } from "@mui/material";
import Gcash from "../../../../public/images/GCash(1).jpg";
import InfoIcon from "@mui/icons-material/Info";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CustomFileUpload from "../../components/CustomFileUpload";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast";
import swal from "sweetalert";
const TransactionsPage = (props) => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [file, setFile] = useState(null);
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
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (cellValue) => {
                return (
                    <>
                        {props.user_role == 4 ? (
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                    setDetails(cellValue.row);
                                }}
                            >
                                <CreditCardIcon />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                    setDetails(cellValue.row);
                                }}
                            >
                                <InfoIcon />
                            </Button>
                        )}
                    </>
                );
            },
        },
    ];
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

    const handleSubmit = (id) => {
        if (file == null) {
            toast("No file upload yet!", {
                type: "error",
            });
        } else {
            api.post("services/submitreceipt", {
                id: id,
                file: file,
            })
                .then((response) => {
                    swal({
                        icon: "success",
                        title: "Success!",
                        text: "Payment has been submitted!",
                        buttons: false,
                    }).then((response) => {
                        window.location.reload();
                    });
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    };

    return (
        <div className="px-10 py-4">
            <CustomToast />
            <CustomBackTitle
                title={`Transactions`}
                url={() => {
                    window.location.replace("/services");
                }}
            />
            <div className="my-5">
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 550,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        {props.user_role == 4 ? (
                            details && details.id !== null ? (
                                <>
                                    <Typography variant="h5" fontWeight={700}>
                                        GCash Payment
                                    </Typography>
                                    <div className="flex justify-center items-center my-7">
                                        <img
                                            src={Gcash}
                                            className="h-full w-2/3"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <CustomFileUpload
                                            handleFile={setFile}
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        style={{ marginTop: 10 }}
                                        onClick={() => {
                                            if (file == null) {
                                                toast("No file upload yet!", {
                                                    type: "error",
                                                });
                                            } else {
                                                const formdata = new FormData();
                                                formdata.append(
                                                    "id",
                                                    details.id
                                                );
                                                formdata.append("file", file);
                                                api.post(
                                                    "services/submitreceipt",
                                                    formdata
                                                )
                                                    .then((response) => {
                                                        console.log(
                                                            response.data
                                                        );
                                                        swal({
                                                            icon: "success",
                                                            title: "Success!",
                                                            text: "Payment has been submitted!",
                                                            buttons: false,
                                                        }).then((response) => {
                                                            window.location.reload();
                                                        });
                                                    })
                                                    .catch((err) => {
                                                        console.log(
                                                            err.response
                                                        );
                                                    });
                                            }
                                        }}
                                    >
                                        SUBMIT PAYMENT
                                    </Button>
                                </>
                            ) : null
                        ) : (
                            <>
                                <Typography variant="h5" fontWeight={700}>
                                    Submitted GCash
                                </Typography>
                                <div className="flex justify-center items-center">
                                    {details &&
                                    details.payment_image !== null ? (
                                        <>
                                            <img
                                                src={`https://brgyugongpasigcity.com/BarangaySystem-main/public/image/payments/${
                                                    details.payment_image
                                                        ? details.payment_image
                                                        : ""
                                                }`}
                                            />
                                            <div className="flex justify-center items-center">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        api.post(
                                                            "services/verifypayment",
                                                            {
                                                                id: details.id,
                                                            }
                                                        )
                                                            .then(
                                                                (response) => {
                                                                    swal({
                                                                        icon: "success",
                                                                        title: "Success!",
                                                                        text: "Payment has been verified!",
                                                                        buttons: false,
                                                                    }).then(
                                                                        (
                                                                            response
                                                                        ) => {
                                                                            window.location.reload();
                                                                        }
                                                                    );
                                                                }
                                                            )
                                                            .catch((err) => {
                                                                console.log(
                                                                    err.response
                                                                );
                                                            });
                                                    }}
                                                    fullWidth
                                                >
                                                    Verify Payment
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            No Payment submitted yet
                                        </Typography>
                                    )}
                                </div>
                            </>
                        )}
                    </Box>
                </Modal>
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
    const element = document.getElementById("TransactionsPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <TransactionsPage {...props} />,
        document.getElementById("TransactionsPage")
    );
}
