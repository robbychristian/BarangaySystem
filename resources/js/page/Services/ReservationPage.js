import { Button, Card, Radio, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomTextInput from "../../components/CustomTextInput";
import CustomDateTimeInput from "../../components/CustomDateTimeInput";
import CustomAutoComplete from "../../components/CustomAutoComplete";
import moment from "moment";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast";

const ReservationPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    // PERSONAL INFORMATION
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState(moment());
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [civilStatus, setCivilStatus] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // RESERVATION/REQUEST
    const [reservationType, setReservationType] =
        useState("Barangay Equipment");
    const [itemReservation, setItemReservation] = useState("");

    // ADDITIONAL INFORMATION
    const [dateTimeInformation, setDateTimeInformation] = useState(moment());
    const [purpose, setPurpose] = useState("");

    const handleReservationType = (e) => {
        setReservationType(e.target.value);
    };

    const handleSubmitReservation = () => {
        api.post("services/createreservation", {
            user_id: name.value,
            personal_name: name.label,
            personal_birthday: moment(birthdate).format("YYYY-MM-DD"),
            personal_age: age,
            personal_gender: gender,
            personal_civil_status: civilStatus,
            personal_address: address,
            personal_email: email,
            personal_phone: phoneNumber,
            request_type: reservationType,
            request_item: itemReservation,
            additional_date_time: moment(dateTimeInformation).format(
                "YYYY-MM-DDThh:mm:ssss"
            ),
            additional_purpose: purpose,
        })
            .then((response) => {
                toast.show("Request has been added!", {
                    type: "success",
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    useEffect(() => {
        api.get("services/getallresidents")
            .then((response) => {
                const userList = response.data;
                let temp = [];
                userList.map((item, index) => {
                    temp = [
                        ...temp,
                        {
                            label: item.name,
                            value: item.id,
                        },
                    ];
                });
                setAllUsers(temp);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <div className="px-10 py-4">
            <div className="flex items-center space-x-4">
                <CustomToast />
                <Button onClick={() => window.location.replace("/services")}>
                    <ArrowBackIcon
                        sx={{ fontSize: 30 }}
                        className="cursor-pointer text-sky-600"
                    />
                </Button>
                <Typography variant="h4" fontWeight={"700"}>
                    Reservation/Request Form
                </Typography>
            </div>
            <div id="PersonalInformation" className="py-5">
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
                        Personal Information
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            {/* <CustomTextInput
                                label={`Name`}
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                            /> */}
                            <CustomAutoComplete
                                value={name.label}
                                onChange={(e, value) => setName(value)}
                                options={allUsers}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomDatePicker
                                label={`Birth Date`}
                                value={birthdate}
                                onChangeValue={(value) => setBirthdate(value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Age`}
                                value={age}
                                onChangeValue={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Gender`}
                                value={gender}
                                onChangeValue={(e) => setGender(e.target.value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Civil Status`}
                                value={civilStatus}
                                onChangeValue={(e) =>
                                    setCivilStatus(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Address`}
                                value={address}
                                onChangeValue={(e) =>
                                    setAddress(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Email`}
                                value={email}
                                onChangeValue={(e) => setEmail(e.target.value)}
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
                    </div>
                </Card>
            </div>
            <div id="ReservationData" className="py-5">
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
                        Reservation/Request
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-5">
                        <div className="col-span-1 flex items-center">
                            <Radio
                                checked={
                                    reservationType === "Barangay Equipment"
                                }
                                onChange={handleReservationType}
                                value={"Barangay Equipment"}
                            />
                            <Typography variant="body1">
                                Barangay Equipment
                            </Typography>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Radio
                                checked={reservationType === "Barangay Vehicle"}
                                onChange={handleReservationType}
                                value={"Barangay Vehicle"}
                            />
                            <Typography variant="body1">
                                Barangay Vehicle
                            </Typography>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Radio
                                checked={
                                    reservationType === "Barangay Facility"
                                }
                                onChange={handleReservationType}
                                value={"Barangay Facility"}
                            />
                            <Typography variant="body1">
                                Barangay Facility
                            </Typography>
                        </div>
                    </div>
                    <CustomTextInput
                        label={
                            reservationType === "Barangay Equipment"
                                ? `Barangay Equipment`
                                : reservationType === "Barangay Vehicle"
                                ? "Barangay Vehicle"
                                : "Barangay Facility"
                        }
                        value={itemReservation}
                        onChangeValue={(e) =>
                            setItemReservation(e.target.value)
                        }
                    />
                </Card>
            </div>
            <div id="AdditionalInfo" className="py-5">
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
                        Additional Information
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomDateTimeInput
                                label={`Date and Time`}
                                value={dateTimeInformation}
                                onChangeValue={(e) =>
                                    setDateTimeInformation(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Purpose`}
                                value={purpose}
                                onChangeValue={(e) =>
                                    setPurpose(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex justify-end">
                <Button variant="contained" onClick={handleSubmitReservation}>
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export default ReservationPage;

if (document.getElementById("ReservationPage")) {
    ReactDOM.render(
        <ReservationPage />,
        document.getElementById("ReservationPage")
    );
}
