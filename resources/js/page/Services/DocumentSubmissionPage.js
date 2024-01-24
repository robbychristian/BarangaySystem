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
import swal from "sweetalert";
import CustomSelectInput from "../../components/CustomSelectInput";

const DocumentSubmissionPage = ({user}) => {
    const genders = ["Male", "Female"];
    const documentTypes = ['Barangay Clearance', 'Cedula', 'Barangay Certificate', 'Business Clearance']
    const civilStatuses = ["Single", "Married", "Widow/Widower"];

    const userObject = JSON.parse(user)
    // const [user, setUser] = useState(JSON.parse(props.user))
    const [allUsers, setAllUsers] = useState([]);
    const [documentCode, setDocumentCode] = useState('DS-00')
    //PERSONAL INFO
    const [userValue, setUserValue] = useState(userObject.user_role == 4 ? {label: userObject.name, value: userObject.id} : {});
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
                swal({
                    icon: "success",
                    title: "Success!",
                    text: "Document has been submitted!",
                    buttons: false,
                }).then((response) => {
                    window.location.reload();
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

    useEffect(() => {
        if (userObject.user_role == 4) {
            api.get(`getuseronlogin?user_id=${userObject.id}`)
                .then((response) => {
                    setBirthdate(dayjs(response.data.birthday))
                    setAge(response.data.age)
                    setGender(response.data.gender)
                    setCivilStatus(response.data.civil_status)
                    setAddress(response.data.address)
                    setEmail(response.data.owned_by.email)
                    setPhoneNumber(response.data.phone_number)
                }).catch(err => {
                    console.log(err.response)
                })
        }
    }, [])

    useEffect(() => {
        api.get('services/getlatestdocument')
            .then((response) => {
                if (response.data == "") {
                    setDocumentCode('DS-001')
                } else {
                    setDocumentCode("DS-00"+(Number(response.data)+1))
                }
            }).catch(err => {
                console.log(err.response)
            })
    }, [])

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
            <div className="py-5">
                <CustomTextInput
                    value={documentCode}
                    label={`Document Code`}
                    onChangeValue={(e) => {
                        const input = e.target.value;
                        e.target.value = "DS-00" + input.substring(5)
                        setDocumentCode(e.target.value)
                    }}
                />
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
                                    label={`Name`}
                                    value={userValue.label}
                                    onChange={(e, value) => {
                                        setUserValue(value);
                                        console.log(value)
                                    }}
                                    options={allUsers}
                                    isUser={userObject.user_role == 4}
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
                            <CustomSelectInput
                                options={civilStatuses}
                                value={civilStatus}
                                label={"Civil Status"}
                                onChange={(e) => {
                                    setCivilStatus(e.target.value);
                                    console.log(e.target.value);
                                }}
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
                    <div className="grid grid-cols-1 gap-4 my-5">
                        <div className="col-span-1">
                        <CustomSelectInput
                                options={documentTypes}
                                value={documentType}
                                label={"Gender"}
                                onChange={(e) => {
                                    setDocumentType(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
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
                    </div> */}
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
                    <div className="grid grid-cols-1 gap-4 my-5">
                            <div className="col-span-1">
                                <CustomTextInput
                                    label={`Purpose of Document`}
                                    value={purposeOfDocument}
                                    onChangeValue={(e) =>
                                        setPurposeOfDocument(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomFileUpload handleFile={setFile} />
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
    const element = document.getElementById("DocumentSubmissionPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <DocumentSubmissionPage {...props} />,
        document.getElementById("DocumentSubmissionPage")
    );
}
