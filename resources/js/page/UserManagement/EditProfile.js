import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomToast from "../../components/CustomToast";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { Button, Card, Typography } from "@mui/material";
import { api } from "../../config/api";
import CustomTextInput from "../../components/CustomTextInput";
import CustomSelectInput from "../../components/CustomSelectInput";
import CustomDateTimeInput from "../../components/CustomDateTimeInput";
import moment from "moment";
import dayjs from "dayjs";
import swal from "sweetalert";

const EditProfile = ({ user }) => {
    const genders = ["Male", "Female"];
    const civilStatuses = ["Single", "Married", "Widow/Widower"];
    const userObject = JSON.parse(user);
    const [userProfile, setUserProfile] = useState({});
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState(dayjs());
    const [gender, setGender] = useState("");
    const [civilStatus, setCivilStatus] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    console.log(userObject.id);
    useEffect(() => {
        api.get(`getuseronlogin?user_id=${userObject.id}`)
            .then((response) => {
                setGender(response.data.gender);
                setAge(response.data.age);
                setCivilStatus(response.data.civil_status);
                setPhoneNumber(response.data.phone_number);
                setBirthday(dayjs(response.data.birthday));
                setAddress(response.data.address);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const editProfile = () => {
        api.post('usermanagement/editprofile', {
            user_id: userObject.id,
            gender,
            birthday: moment(birthday).format("YYYY-MM-DD"),
            age,
            civilStatus,
            phoneNumber,
            address
        }).then((response) => {
            if (response.data == true) {
                swal({
                    icon: 'success',
                    title: "Profile Updated!",
                    text: "Your profile has been updated!"
                })
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    const changePassword = () => {
        if (newPassword !== confPassword) {
            swal({
                icon: "error",
                title: "Password Mismatch!",
                text: "Password does not match!"
            });
        } else {
            api.post('usermanagement/changepassword', {
                user_id: userObject.id,
                newPassword: newPassword,
                currentPassword: currentPassword
            })
            .then((response) => {
                if (response.data == false) {
                    swal({
                        icon: 'error',
                        title: "Password is incorrect!",
                        text: "Current password does not match!"
                    })
                } else {
                    swal({
                        icon: 'success',
                        title: "Password has been updated!",
                        text: "Your password has been updated!!"
                    }).then(() => {
                        location.reload()
                    })
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }

    return (
        <div className="px-10 py-4">
            <CustomToast />
            <CustomBackTitle title={`My Profile`} url={"/home"} />
            <div className="py-5">
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
                        Edit Profile
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                disabled={true}
                                label={"Name"}
                                value={userObject.name}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomSelectInput
                                options={genders}
                                value={gender}
                                label={"Gender"}
                                onChange={(e) => {
                                    setGender(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomDateTimeInput
                                label={`Birth Date`}
                                value={moment(birthday)}
                                onChangeValue={(value) => setBirthday(value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Age`}
                                value={age}
                                onChangeValue={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomSelectInput
                                options={civilStatuses}
                                value={civilStatus}
                                label={"Civil Status"}
                                onChange={(e) => {
                                    setCivilStatus(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Phone Number`}
                                value={phoneNumber}
                                onChangeValue={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <CustomTextInput
                                label={`Address`}
                                value={address}
                                onChangeValue={(e) =>
                                    setAddress(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <Button variant="contained" fullWidth onClick={editProfile}>
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="py-5">
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
                        Change Password
                    </Typography>
                    <div className="grid grid-cols-1 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={"Current Password"}
                                value={currentPassword}
                                onChangeValue={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                type={`password`}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={"New Password"}
                                value={newPassword}
                                onChangeValue={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                type={`password`}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={"Password Confirmation"}
                                value={confPassword}
                                onChangeValue={(e) =>
                                    setConfPassword(e.target.value)
                                }
                                type={`password`}
                            />
                        </div>
                        <div className="col-span-1">
                            <Button variant="contained" fullWidth onClick={changePassword}>
                                Change Password
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

if (document.getElementById("profilePage")) {
    const element = document.getElementById("profilePage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <EditProfile {...props} />,
        document.getElementById("profilePage")
    );
}
