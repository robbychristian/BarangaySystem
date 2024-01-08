import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast";
import { api } from "../../config/api";
import logo from "../../../../public/images/barnagayugong.png";
import CustomFileUpload from "../../components/CustomFileUpload";
import InfoIcon from "@mui/icons-material/Info";
import CustomDatePicker from "../../components/CustomDatePicker";
import dayjs from "dayjs";
import moment from "moment/moment";

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setFile] = useState();
    const [passwordRequirement, setPasswordRequirement] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    //USER PROFILE
    const [birthdate, setBirthdate] = useState(dayjs())
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [civilStatus, setCivilStatus] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
        if (password.length < 8) {
            setPasswordRequirement(true);
        } else {
            setPasswordRequirement(false);
        }
    }, [password, confirmPassword]);

    const onHandleRegister = () => {
        if (
            name == "" ||
            email == "" ||
            password == "" ||
            confirmPassword == ""
        ) {
            toast.error("Please fill in the form!");
        } else if (password !== confirmPassword) {
            toast.error("Passwords does not match!");
        } else {
            setLoading(true);
            const toastLoading = toast.loading("Registering...");
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("password_confirmation", confirmPassword);
            formdata.append("submitted_id", file);
            formdata.append("birthday", moment(birthdate).format("YYYY-MM-DD"));
            formdata.append("age", age);
            formdata.append("gender", gender);
            formdata.append("civil_status", civilStatus);
            formdata.append("address", address);
            formdata.append("phone_number", phoneNumber);
            api.post("register", formdata)
                .then((response) => {
                    console.log('nice')
                    toast.update(toastLoading, {
                        render: "Registered!",
                        type: "success",
                        isLoading: false,
                        autoClose: 5000,
                    });
                    setLoading(false);
                    location.reload
                })
                .catch((err) => {
                    toast.update(toastLoading, {
                        render: err.response.data.errors.email[0],
                        type: "error",
                        isLoading: false,
                        autoClose: 5000,
                    });
                    setLoading(false);
                    console.error(err.response.data.errors);
                });
        }
    };

    return (
        <div className="bg-sky-600">
            <CustomToast />
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen px-24">
                <div className="hidden lg:col-span-1 lg:flex lg:justify-center lg:items-center">
                    <img
                        src={`https://brgyugongpasigcity.com/BarangaySystem-main/public/images/barnagayugong.png`}
                    />
                </div>

                <div className="col-span-1 flex flex-col justify-center items-center">
                    <div className="p-10 border-2 border-sky-600 rounded bg-white">
                        <div className="text-container mb-4">
                            <Typography
                                fontSize={30}
                                fontWeight={"700"}
                                color={"#0284C7"}
                            >
                                Register Here!
                            </Typography>
                            <Typography
                                fontSize={15}
                                fontWeight={"300"}
                                color={"#0284C7"}
                            >
                                Complete this registration to be registered as a
                                resident!
                            </Typography>
                        </div>
                        {page == 1 && (
                            <>
                                <CustomTextInput
                                    label={`Name`}
                                    value={name}
                                    onChangeValue={(e) =>
                                        setName(e.target.value)
                                    }
                                    my={5}
                                    restrictions={"alphabet"}
                                />
                                <CustomTextInput
                                    label={`Email`}
                                    value={email}
                                    onChangeValue={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    my={5}
                                />
                                <CustomTextInput
                                    label={`Password`}
                                    value={password}
                                    onChangeValue={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    my={5}
                                    type={`password`}
                                />
                                {passwordRequirement && (
                                    <Typography
                                        className="text-red-500"
                                        fontSize={12}
                                        letterSpacing={"0.4px"}
                                    >
                                        Password should at least have 8
                                        characters!
                                    </Typography>
                                )}
                                <CustomTextInput
                                    label={`Confirm Password`}
                                    value={confirmPassword}
                                    onChangeValue={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    my={5}
                                    type={`password`}
                                />
                                {passwordError && (
                                    <Typography
                                        className="text-red-500"
                                        fontSize={12}
                                        letterSpacing={"0.4px"}
                                    >
                                        Password does not match!
                                    </Typography>
                                )}
                                <CustomFileUpload
                                    handleFile={setFile}
                                    my={10}
                                />
                                <div className="flex">
                                    <InfoIcon
                                        sx={{ fontSize: 20, color: "#0284C7" }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "#0284C7",
                                            marginTop: 0.2,
                                            marginLeft: 0.5,
                                        }}
                                    >
                                        Upload your ID here
                                    </Typography>
                                </div>
                            </>
                        )}
                        {page == 2 && (
                            <>
                            <CustomDatePicker 
                                label={`Birth Date`}
                                value={birthdate}
                                onChangeValue={(value) => setBirthdate(value)}
                            />
                            <CustomTextInput
                                label={`Age`}
                                value={age}
                                onChangeValue={(e) =>
                                    setAge(e.target.value)
                                }
                                my={5}
                                restrictions={"numeric"}
                            />
                            <CustomTextInput
                                label={`Gender`}
                                value={gender}
                                onChangeValue={(e) =>
                                    setGender(e.target.value)
                                }
                                my={5}
                                restrictions={"alphabet"}
                            />
                            <CustomTextInput
                                label={`Civil Status`}
                                value={civilStatus}
                                onChangeValue={(e) =>
                                    setCivilStatus(e.target.value)
                                }
                                my={5}
                                restrictions={"alphabet"}
                            />
                            <CustomTextInput
                                label={`Address`}
                                value={address}
                                onChangeValue={(e) =>
                                    setAddress(e.target.value)
                                }
                                my={5}
                            />
                            <CustomTextInput
                                label={`Phone Number`}
                                value={phoneNumber}
                                onChangeValue={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                                my={5}
                                restrictions={"numeric"}
                            />
                        </>
                        )}
                        <Typography variant="body1">
                            Already have an account?{" "}
                            <span className="underline cursor-pointer">
                                <a href="/login" className="text-sky-600">
                                    Login here!
                                </a>
                            </span>
                        </Typography>
                        {page == 2 && (
                            <CustomButton
                            color={'error'}
                                variant={"contained"}
                                label={"BACK"}
                                my={10}
                                isFull
                                onClick={() => setPage(1)}
                                loading={loading}
                            />
                        )}
                        <CustomButton
                            variant={"contained"}
                            label={page == 1 ? "NEXT" : "REGISTER"}
                            my={10}
                            isFull
                            onClick={page == 1 ? () => {
                                if (name == "" || email == "" || password == "" || confirmPassword == "") {
                                    toast.error("Please fill in the form!");
                                } else if (password !== confirmPassword) {
                                    toast.error("Passwords does not match!");
                                } else {
                                    setPage(2)
                                }
                            } : onHandleRegister}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

if (document.getElementById("RegisterPage")) {
    ReactDOM.render(<RegisterPage />, document.getElementById("RegisterPage"));
}
