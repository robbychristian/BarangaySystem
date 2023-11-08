import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import CustomToast from "../../components/CustomToast";
import { Button, Card, Typography } from "@mui/material";
import CustomTextInput from "../../components/CustomTextInput";
import CustomAutoComplete from "../../components/CustomAutoComplete";
import { api } from "../../config/api";
import { toast } from "react-toastify";

const userRoles = [
    { label: "Barangay Official", value: 2 },
    { label: "Barangay Staff", value: 3 },
    { label: "Resident", value: 4 },
];

const AddUserPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleOnSubmit = () => {
        if (
            name == "" ||
            email == "" ||
            userRole == "" ||
            password == "" ||
            confirmPassword == ""
        ) {
            toast("Please fill in the form!", {
                type: "error",
            });
        } else if (password !== confirmPassword) {
            toast("Password does not match!", {
                type: "error",
            });
        } else {
            api.post("usermanagement/createuser", {
                name: name,
                email: email,
                password: password,
                user_role: userRole.value,
            })
                .then((response) => {
                    toast("User added successfully!", {
                        type: "success",
                    });
                    setName("");
                    setEmail("");
                    setUserRole("");
                    setPassword("");
                    setConfirmPassword("");
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    };

    return (
        <div className="px-10 py-4">
            <CustomToast />
            <CustomBackTitle title={"Add User"} url={"/usermanagement"} />
            <div id="AddUser" className="py-5">
                <Card
                    sx={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingLeft: 5,
                        paddingRight: 5,
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={"700"}
                        color={"#0284C7"}
                    >
                        User Information
                    </Typography>
                    <div className="grid grid-cols-1 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Name`}
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Email`}
                                value={email}
                                onChangeValue={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomAutoComplete
                                label={`User Role`}
                                value={userRole.label}
                                onChange={(e, value) => {
                                    setUserRole(value);
                                }}
                                options={userRoles}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Password`}
                                type={`password`}
                                value={password}
                                onChangeValue={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Current Password`}
                                type={`password`}
                                value={confirmPassword}
                                onChangeValue={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleOnSubmit}
                        >
                            ADD USER
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddUserPage;

if (document.getElementById("AddUserPage")) {
    ReactDOM.render(<AddUserPage />, document.getElementById("AddUserPage"));
}
