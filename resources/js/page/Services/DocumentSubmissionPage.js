import { Button, Card, Radio, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTextInput from "../../components/CustomTextInput";
import CustomDatePicker from "../../components/CustomDatePicker";
import dayjs from "dayjs";
import CustomFileUpload from "../../components/CustomFileUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { api } from "../../config/api";
import CustomAutoComplete from "../../components/CustomAutoComplete";

const DocumentSubmissionPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    //PERSONAL INFO
    const [userValue, setUserValue] = useState({});
    const [birthdate, setBirthdate] = useState(dayjs());
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [civilStatus, setCivilStatus] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    //DOCUMENT TYPE
    const [documentType, setDocumentType] = useState("Barangay Clearance");
    //ADDITIONAL INFORMATION
    const [natureOfBusiness, setNatureOfBusiness] = useState("");
    const [purposeOfDocument, setPurposeOfDocument] = useState("");
    const [file, setFile] = useState();

    const handleOnDocumentType = (e) => {
        setDocumentType(e.target.value);
    };

    const handleSubmitDocument = () => {
        const formdata = new FormData();
        formdata.append("user_id", userValue.value);
        formdata.append("name", userValue.label);
        formdata.append("age", age);
        formdata.append("gender", gender);
        formdata.append("birth_date", birthdate);
        formdata.append("civil_status", civilStatus);
        formdata.append("address", address);
        formdata.append("email", email);
        formdata.append("phone_number", phoneNumber);
        formdata.append("document_type", documentType);
        formdata.append("nature_of_business", natureOfBusiness);
        formdata.append("purpose_of_document", purposeOfDocument);
        formdata.append("file", file);

        api.post("services/createdocument", formdata)
            .then((response) => {
                console.log(response.data);
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
                <Button onClick={() => window.location.replace("/services")}>
                    <ArrowBackIcon
                        sx={{ fontSize: 30 }}
                        className="cursor-pointer text-sky-600"
                    />
                </Button>
                <Typography variant="h4" fontWeight={"700"}>
                    Document Submission
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
                            <CustomAutoComplete
                                value={userValue.label}
                                onChange={(e, value) => {
                                    setUserValue(value);
                                }}
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
            <div id="DocumentType" className="py-5">
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
                        Document Type
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1 flex items-center">
                            <Radio
                                checked={documentType === "Barangay Clearance"}
                                onChange={handleOnDocumentType}
                                value={"Barangay Clearance"}
                            />
                            <Typography variant="body1">
                                Barangay Clearance
                            </Typography>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Radio
                                checked={documentType === "Cedula"}
                                onChange={handleOnDocumentType}
                                value={"Cedula"}
                            />
                            <Typography variant="body1">Cedula</Typography>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1 flex items-center">
                            <Radio
                                checked={
                                    documentType === "Barangay Certificate"
                                }
                                onChange={handleOnDocumentType}
                                value={"Barangay Certificate"}
                            />
                            <Typography variant="body1">
                                Barangay Certificate
                            </Typography>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <Radio
                                checked={documentType === "Business Clearance"}
                                onChange={handleOnDocumentType}
                                value={"Business Clearance"}
                            />
                            <Typography variant="body1">
                                Business Clearance
                            </Typography>
                        </div>
                    </div>
                </Card>
            </div>
            <div id="DocumentType" className="py-5">
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
                        <div className="grid grid-rows-2 gap-4">
                            <div className="row-span-1">
                                <CustomTextInput
                                    label={`Nature of Business`}
                                    value={natureOfBusiness}
                                    onChangeValue={(e) =>
                                        setNatureOfBusiness(e.target.value)
                                    }
                                />
                            </div>
                            <div className="row-span-1">
                                <CustomTextInput
                                    label={`Purpose of Document`}
                                    value={purposeOfDocument}
                                    onChangeValue={(e) =>
                                        setPurposeOfDocument(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-rows-2 gap-4">
                            <div className="row-span-1 flex justify-end"></div>
                            <div className="row-span-1 flex justify-end">
                                <CustomFileUpload handleFile={setFile} />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex justify-end">
                <Button variant="contained" onClick={handleSubmitDocument}>
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export default DocumentSubmissionPage;

if (document.getElementById("DocumentSubmissionPage")) {
    ReactDOM.render(
        <DocumentSubmissionPage />,
        document.getElementById("DocumentSubmissionPage")
    );
}
