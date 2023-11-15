import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { DataGrid } from "@mui/x-data-grid";
import { data } from "autoprefixer";
import { api } from "../../config/api";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import moment from "moment";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast";
import DescriptionIcon from "@mui/icons-material/Description";

const UserManagementPage = (props) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.get("usermanagement/getallusers")
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
        console.log(props.user_role);
    }, [count]);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "name",
            headerName: "Name",
            width: 150,
            editable: true,
        },
        {
            field: "user_role",
            headerName: "User Role",
            width: 150,
            editable: true,
            renderCell: (cellValue) => {
                return cellValue.value == 1
                    ? "Admin"
                    : cellValue.value == 2
                    ? "Barangay Official"
                    : cellValue.value == 3
                    ? "Barangay Staff"
                    : "Resident";
            },
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
            field: "action",
            headerName: "Actions",
            width: 250,
            editable: true,
            renderCell: (cellValue) => {
                if (props.user_role == 4) {
                } else if (cellValue.row.user_role != 1) {
                    return (
                        <>
                            <Button
                                onClick={() => {
                                    if (cellValue.row.user_role <= 2) {
                                        toast(
                                            "User already a Barangay Official",
                                            {
                                                type: "info",
                                            }
                                        );
                                    } else {
                                        api.post("usermanagement/promoteuser", {
                                            id: cellValue.row.id,
                                            user_role: cellValue.row.user_role,
                                        })
                                            .then((response) => {
                                                console.log(response.data);
                                                setCount(count + 1);
                                            })
                                            .catch((err) => {
                                                console.log(err.response);
                                            });
                                    }
                                }}
                            >
                                <ArrowUpwardIcon className="text-lime-600" />
                            </Button>
                            <Button
                                onClick={() => {
                                    if (cellValue.row.user_role >= 4) {
                                        toast("User already a Resident", {
                                            type: "info",
                                        });
                                    } else {
                                        api.post("usermanagement/demoteuser", {
                                            id: cellValue.row.id,
                                            user_role: cellValue.row.user_role,
                                        })
                                            .then((response) => {
                                                console.log(response.data);
                                                setCount(count + 1);
                                            })
                                            .catch((err) => {
                                                console.log(err.response);
                                            });
                                    }
                                }}
                            >
                                <ArrowDownwardIcon className="text-red-500" />
                            </Button>
                            {cellValue.row.is_verified == null &&
                                cellValue.row.user_role == 4 && (
                                    <Button
                                        onClick={() => {
                                            setUser(cellValue.row);
                                            setOpen(true);
                                        }}
                                    >
                                        <DescriptionIcon className="text-sky-600" />
                                    </Button>
                                )}
                        </>
                    );
                }
            },
        },
    ];

    return (
        <div className="px-10 py-4">
            <CustomToast />
            <CustomBackTitle
                title={"User Management"}
                url={"/home"}
                hasButton
                label={`Add User`}
                onClick={() =>
                    window.location.replace("/usermanagement/adduser")
                }
            />
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
                    <Typography variant="h5" fontWeight={700}>
                        User's Submitted ID
                    </Typography>
                    <div className="flex justify-center items-center">
                        <img
                            src={`https://brgyugongpasigcity.com/BarangaySystem-main/public/image/SubmittedID/6/${
                                user && user.submitted_id !== null
                                    ? user.submitted_id
                                    : ""
                            }`}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <Button
                            variant="contained"
                            onClick={() => {
                                const id =
                                    user && user.id !== null ? user.id : 0;
                                api.post("usermanagement/verifyuser", {
                                    id: id,
                                })
                                    .then((response) => {
                                        window.location.reload();
                                    })
                                    .catch((err) => {
                                        console.log(err.response);
                                    });
                            }}
                        >
                            Verify User
                        </Button>
                    </div>
                </Box>
            </Modal>
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
    const element = document.getElementById("UserManagementPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <UserManagementPage {...props} />,
        document.getElementById("UserManagementPage")
    );
}
