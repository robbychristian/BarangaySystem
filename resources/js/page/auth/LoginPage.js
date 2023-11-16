import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomToast from "../../components/CustomToast";
import { Typography } from "@mui/material";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";
import { api } from "../../config/api";
import logo from "../../../../public/images/barnagayugong.png";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email == "" || password == "") {
            toast.error("Please fill in the form!");
        } else {
            setLoading(true);
            const toastLoading = toast.loading("Logging in...");
            api.post("login", {
                email,
                password,
            })
                .then((response) => {
                    toast.update(toastLoading, {
                        render: "Logged In!",
                        type: "success",
                        isLoading: false,
                        autoClose: 5000,
                    });
                    setLoading(false);
                    window.location.replace("/home");
                })
                .catch((err) => {
                    setLoading(false);
                    const errors = err.response.data.errors.email;
                    // console.log(errors);
                    errors.map((item, index) => {
                        toast.update(toastLoading, {
                            render: item,
                            type: "error",
                            isLoading: false,
                            autoClose: 5000,
                        });
                    });
                    // console.log(err.response.data.errors);
                });
        }
    };

    return (
        <div className="bg-sky-600">
            <CustomToast />
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen px-24">
                <div className="col-span-1 flex flex-col justify-center items-center">
                    <div className="p-10 border-2 border-sky-600 rounded bg-white">
                        <div className="text-container mb-4">
                            <Typography
                                fontSize={30}
                                fontWeight={"700"}
                                color={`#0284C7`}
                            >
                                Welcome to Barangay Ugong!
                            </Typography>
                            <Typography
                                fontSize={15}
                                fontWeight={"300"}
                                color={"#0284C7"}
                            >
                                Login Here!
                            </Typography>
                        </div>
                        <CustomTextInput
                            label={`Email`}
                            value={email}
                            onChangeValue={(e) => setEmail(e.target.value)}
                            my={5}
                        />
                        <CustomTextInput
                            label={`Password`}
                            value={password}
                            onChangeValue={(e) => setPassword(e.target.value)}
                            my={5}
                            type={`password`}
                        />
                        <Typography variant="body1">
                            Don't have an account yet?{" "}
                            <span className="underline cursor-pointer">
                                <a href="/register" className="text-sky-600">
                                    Register here!
                                </a>
                            </span>
                        </Typography>
                        <CustomButton
                            variant={"contained"}
                            label={`LOGIN`}
                            my={10}
                            isFull
                            onClick={onHandleLogin}
                            loading={loading}
                        />
                    </div>
                </div>
                <div className="hidden lg:col-span-1 lg:flex lg:justify-center lg:items-center">
                    <img
                        src={`https://brgyugongpasigcity.com/BarangaySystem-main/public/images/barnagayugong.png`}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

if (document.getElementById("LoginPage")) {
    ReactDOM.render(<LoginPage />, document.getElementById("LoginPage"));
}
