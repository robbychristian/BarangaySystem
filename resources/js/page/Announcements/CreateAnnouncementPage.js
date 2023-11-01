import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomTextInput from "../../components/CustomTextInput";
import CustomFileUpload from "../../components/CustomFileUpload";
import CustomDateTimeInput from "../../components/CustomDateTimeInput";
import CustomToast from "../../components/CustomToast";
import dayjs from "dayjs";
import { api } from "../../config/api";
import { toast } from "react-toastify";
import moment from "moment";

const CreateAnnouncementPage = (props) => {
    //type of form
    const [createType, setCreateType] = useState("1");
    //for all
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    //for events only
    const [dateStart, setDateStart] = useState(moment());
    const [dateEnd, setDateEnd] = useState(moment());
    //for upload file
    const [file, setFile] = useState();

    const handleOnChangeCreateType = (e) => {
        setCreateType(e.target.value);
    };

    const handleSubmitAnnouncement = () => {
        if (title === "" || description === "") {
            toast("Please complete the form", {
                type: "error",
            });
        } else {
            const auth = JSON.parse(props.auth);
            api.post("announcements/createannouncement", {
                user_id: auth.id,
                announcement_title: title,
                announcement_description: description,
            })
                .then(() => {
                    if (createType === "1") {
                        toast("Announcement has been added!", {
                            type: "success",
                        });
                        setTitle("");
                        setDescription("");
                    }
                })
                .catch((err) => {
                    toast(err.response.data, {
                        type: "error",
                    });
                });
        }
    };

    const handleSubmitEvent = () => {
        if (title === "" || description === "") {
            toast("Please complete the form", {
                type: "error",
            });
        } else {
            const auth = JSON.parse(props.auth);
            api.post("announcements/createevent", {
                user_id: auth.id,
                event_title: title,
                event_description: description,
                event_start: moment(dateStart).format("YYYY-MM-DDThh:mm:ss"),
                event_end: moment(dateEnd).format("YYYY-MM-DDThh:mm:ss"),
            })
                .then((response) => {
                    toast("Event has been added!", {
                        type: "success",
                    });
                    setTitle("");
                    setDescription("");
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                    toast(err.response.data);
                });
        }
    };

    const handleSubmitNews = () => {
        if (title === "" || description === "" || file === null) {
            toast("Please complete the form", {
                type: "error",
            });
        } else {
            const auth = JSON.parse(props.auth);
            const formdata = new FormData();
            formdata.append("user_id", auth.id);
            formdata.append("news_title", title);
            formdata.append("news_description", description);
            formdata.append("news_image", file);
            api.post("announcements/createnews", formdata)
                .then((response) => {
                    if (createType === "3") {
                        toast("News has been added!", {
                            type: "success",
                        });
                        setTitle("");
                        setDescription("");
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    toast(err.response.data);
                });
        }
    };

    useEffect(() => {
        const auth = JSON.parse(props.auth);
    }, []);

    return (
        <div className="px-10 py-4">
            <CustomToast />
            <div className="flex items-center space-x-4">
                <Button
                    onClick={() => window.location.replace("/announcements")}
                >
                    <ArrowBackIcon
                        sx={{ fontSize: 30 }}
                        className="cursor-pointer text-sky-600"
                    />
                </Button>
                <Typography variant="h4" fontWeight={"700"}>
                    Create Announcement
                </Typography>
            </div>
            <div id="SelectFormType">
                <Card
                    sx={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingLeft: 5,
                        paddingRight: 5,
                        marginTop: 4,
                        marginBottom: 4,
                    }}
                >
                    <Typography variant="h5" fontWeight={"700"}>
                        Form Type
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <CustomRadioButton
                                checked={createType === "1"}
                                onChange={handleOnChangeCreateType}
                                value={`1`}
                                label={`Announcement`}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomRadioButton
                                checked={createType === "2"}
                                onChange={handleOnChangeCreateType}
                                value={`2`}
                                label={`Event`}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomRadioButton
                                checked={createType === "3"}
                                onChange={handleOnChangeCreateType}
                                value={`3`}
                                label={`News`}
                            />
                        </div>
                    </div>
                </Card>
            </div>

            <div id="FormDisplay">
                <Typography variant="h5" fontWeight={`700`}>
                    {createType === "1"
                        ? "Announcement"
                        : createType === "2"
                        ? "Event"
                        : "News"}{" "}
                    Form
                </Typography>
                <CustomTextInput
                    label={`${
                        createType === "1"
                            ? "Announcement"
                            : createType === "2"
                            ? "Event"
                            : "News"
                    } Title`}
                    value={title}
                    onChangeValue={(e) => setTitle(e.target.value)}
                    my={10}
                />
                <CustomTextInput
                    label={`${
                        createType === "1"
                            ? "Announcement"
                            : createType === "2"
                            ? "Event"
                            : "News"
                    } Description`}
                    value={description}
                    onChangeValue={(e) => setDescription(e.target.value)}
                    my={10}
                />
                {createType === "2" && (
                    <>
                        <CustomDateTimeInput
                            label={`Event Start`}
                            my={1.5}
                            value={dateStart}
                            onChangeValue={(value) => setDateStart(value)}
                        />
                        <CustomDateTimeInput
                            label={`Event End`}
                            my={1.5}
                            value={moment(dateEnd)}
                            onChangeValue={(value) => setDateEnd(value)}
                        />
                    </>
                )}
                {createType === "3" && (
                    <CustomFileUpload handleFile={setFile} my={10} />
                )}
                <div>
                    <Button
                        variant="contained"
                        onClick={
                            createType === "1"
                                ? handleSubmitAnnouncement
                                : createType === "2"
                                ? handleSubmitEvent
                                : handleSubmitNews
                        }
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 10 }}
                    >
                        SUBMIT
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateAnnouncementPage;

if (document.getElementById("CreateAnnouncementPage")) {
    const element = document.getElementById("CreateAnnouncementPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <CreateAnnouncementPage {...props} />,
        document.getElementById("CreateAnnouncementPage")
    );
}
