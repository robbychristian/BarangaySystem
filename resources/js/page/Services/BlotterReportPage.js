import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomTextInput from "../../components/CustomTextInput";
import CustomDateTimeInput from "../../components/CustomDateTimeInput";
import dayjs from "dayjs";
import { api } from "../../config/api";
import CustomAutoComplete from "../../components/CustomAutoComplete";
import moment from "moment";
import CustomToast from "../../components/CustomToast";
import { toast } from "react-toastify";
import CustomSelectInput from "../../components/CustomSelectInput";

const BlotterReportPage = ({ user }) => {
    const genders = ["Male", "Female"];
    const userObject = JSON.parse(user);
    const [incidentType, setIncidentType] = useState("");
    const [documentCode, setDocumentCode] = useState("");

    useEffect(() => {
        api.get("services/getlatestblotterreport").then((response) => {
            if (response.data == "") {
                setDocumentCode("BR-001");
            } else {
                setDocumentCode("BR-00" + (Number(response.data) + 1));
            }
        });
    }, []);

    const incidentTypes = ["Theft", "Armed Robbery", "Assault", "Drug Related"];

    //REPORTING PERSON
    const [reportingName, setReportingName] = useState(
        userObject.user_role == 4
            ? { label: userObject.name, value: userObject.id }
            : {}
    );
    const [dateTimeReport, setDateTimeReport] = useState(moment());
    const [reportingAge, setReportingAge] = useState("");
    const [reportingGender, setReportingGender] = useState("");
    const [dateTimeIncident, setDateTimeIncident] = useState(moment());
    const [reportingAddress, setReportingAddress] = useState("");
    const [reportingPhoneNumber, setReportingPhoneNumber] = useState("");

    //SUSPECT DATA
    const [suspectName, setSuspectName] = useState("");
    const [suspectRelationToVictim, setSuspectRelationToVictim] = useState("");
    const [suspectAge, setSuspectAge] = useState("");
    const [suspectGender, setSuspectGender] = useState("");
    const [suspectDescription, setSuspectDescription] = useState("");
    const [suspectOccupation, setSuspectOccupation] = useState("");
    const [suspectAddress, setSuspectAddress] = useState("");

    //VICTIM DATA
    const [victimName, setVictimName] = useState("");
    const [victimRelationToSuspect, setVictimRelationToSuspect] = useState("");
    const [victimAge, setVictimAge] = useState("");
    const [victimGender, setVictimGender] = useState("");
    const [victimOccupation, setVictimOccupation] = useState("");
    const [victimAddress, setVictimAddress] = useState("");
    const [victimEmail, setVictimEmail] = useState("");
    const [victimPhoneNumber, setVictimPhoneNumber] = useState("");

    //INCIDENT NARRATIVE
    const [placeOfIncident, setPlaceOfIncident] = useState("");
    const [dateTimeOfNarrative, setDateTimeNarrative] = useState(moment());
    const [narrative, setNarrative] = useState("");

    const [allUsers, setAllUsers] = useState([]);

    const handleSubmitBlotter = () => {
        api.post("services/createblotter", {
            incident_type: incidentType,
            user_id: reportingName.value,
            reporting_name: reportingName.label,
            reporting_date: dateTimeReport,
            reporting_age: reportingAge,
            reporting_gender: reportingGender,
            reporting_incident_time: dateTimeIncident,
            reporting_address: reportingAddress,
            reporting_phone: reportingPhoneNumber,
            suspect_name: suspectName,
            suspect_relation: suspectRelationToVictim,
            suspect_age: suspectAge,
            suspect_gender: suspectGender,
            suspect_occupation: suspectOccupation,
            suspect_address: suspectAddress,
            victim_name: victimName,
            victim_relation: victimRelationToSuspect,
            victim_age: victimAge,
            victim_gender: victimGender,
            victim_occupation: victimOccupation,
            victim_address: victimAddress,
            victim_email: victimEmail,
            victim_phone: victimPhoneNumber,
            narrative_place: placeOfIncident,
            narrative_date: dateTimeOfNarrative,
            narrative: narrative,
        })
            .then((response) => {
                console.log(response.data);
                toast("Blotter has been added!", {
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

    useEffect(() => {
        if (userObject.user_role == 4) {
            api.get(`getuseronlogin?user_id=${userObject.id}`)
                .then((response) => {
                    console.log(response.data);
                    setReportingAge(response.data.age);
                    setReportingGender(response.data.gender);
                    setReportingAddress(response.data.address);
                    setReportingPhoneNumber(response.data.phone_number);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, []);

    return (
        <div className="px-10 py-4">
            <CustomToast />
            <div className="flex items-center space-x-4">
                <Button onClick={() => window.location.replace("/services")}>
                    <ArrowBackIcon
                        sx={{ fontSize: 30 }}
                        className="cursor-pointer text-sky-600"
                    />
                </Button>
                <Typography variant="h4" fontWeight={"700"}>
                    Blotter Report
                </Typography>
            </div>
            <div
                id="IncidentType"
                className="py-5 grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
                <div className="col-span-1">
                    <CustomTextInput
                        label={"Document Code"}
                        value={documentCode}
                        onChangeValue={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <CustomSelectInput
                        options={incidentTypes}
                        value={incidentType}
                        label={"Incident Type"}
                        onChange={(e) => {
                            setIncidentType(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div id="ReportingPerson" className="py-5">
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
                        Reporting Person
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomAutoComplete
                                label={`Name`}
                                value={reportingName.label}
                                onChange={(e, value) => {
                                    setReportingName(value);
                                }}
                                options={allUsers}
                                isUser={userObject.user_role == 4}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomDateTimeInput
                                label={`Date and Time of Report`}
                                value={moment(dateTimeReport)}
                                onChangeValue={(value) =>
                                    setDateTimeReport(value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <CustomTextInput
                                        label={`Age`}
                                        value={reportingAge}
                                        onChangeValue={(e) =>
                                            setReportingAge(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-span-1">
                                    <CustomSelectInput
                                        options={genders}
                                        value={reportingGender}
                                        label={"Gender"}
                                        onChange={(e) => {
                                            setReportingGender(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <CustomDateTimeInput
                                label={`Date and Time of Incident`}
                                value={moment(dateTimeIncident)}
                                onChangeValue={(value) =>
                                    setDateTimeIncident(value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Address`}
                                value={reportingAddress}
                                onChangeValue={(e) =>
                                    setReportingAddress(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Phone Number`}
                                value={reportingPhoneNumber}
                                onChangeValue={(e) =>
                                    setReportingPhoneNumber(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div id="SuspectData" className="py-5">
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
                        Suspect Data
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Name`}
                                value={suspectName}
                                onChangeValue={(e) =>
                                    setSuspectName(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Relation To Victim`}
                                value={suspectRelationToVictim}
                                onChangeValue={(e) =>
                                    setSuspectRelationToVictim(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Age`}
                                value={suspectAge}
                                onChangeValue={(e) =>
                                    setSuspectAge(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomSelectInput
                                options={genders}
                                value={suspectGender}
                                label={"Gender"}
                                onChange={(e) => {
                                    setSuspectGender(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Address`}
                                value={suspectAddress}
                                onChangeValue={(e) =>
                                    setSuspectAddress(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Suspect Description`}
                                value={suspectDescription}
                                onChangeValue={(e) =>
                                    setSuspectDescription(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div id="VictimData" className="py-5">
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
                        Victim Data
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Name`}
                                value={victimName}
                                onChangeValue={(e) =>
                                    setVictimName(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Relation To Suspect`}
                                value={victimRelationToSuspect}
                                onChangeValue={(e) =>
                                    setVictimRelationToSuspect(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Age`}
                                value={victimAge}
                                onChangeValue={(e) =>
                                    setVictimAge(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomSelectInput
                                options={genders}
                                value={victimGender}
                                label={"Gender"}
                                onChange={(e) => {
                                    setVictimGender(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Address`}
                                value={victimAddress}
                                onChangeValue={(e) =>
                                    setVictimAddress(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Email`}
                                value={victimEmail}
                                onChangeValue={(e) =>
                                    setVictimEmail(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Phone Number`}
                                value={victimPhoneNumber}
                                onChangeValue={(e) =>
                                    setVictimPhoneNumber(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div id="IncidentNarrative" className="py-5">
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
                        Incident Narrative
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-4">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Place of Incident`}
                                value={placeOfIncident}
                                onChangeValue={(e) =>
                                    setPlaceOfIncident(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomDateTimeInput
                                label={`Date and Time of Incident`}
                                value={moment(dateTimeOfNarrative)}
                                onChangeValue={(value) =>
                                    setDateTimeNarrative(value)
                                }
                            />
                        </div>
                    </div>
                    <CustomTextInput
                        label={`Narrative`}
                        multiline
                        value={narrative}
                        onChangeValue={(e) => setNarrative(e.target.value)}
                    />
                </Card>
            </div>
            <div className="flex justify-end">
                <Button variant="contained" onClick={handleSubmitBlotter}>
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export default BlotterReportPage;

if (document.getElementById("BlotterReportPage")) {
    const element = document.getElementById("BlotterReportPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <BlotterReportPage {...props} />,
        document.getElementById("BlotterReportPage")
    );
}
