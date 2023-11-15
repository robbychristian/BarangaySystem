import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomToast from "../../components/CustomToast";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { Button, Card, Typography } from "@mui/material";
import CustomAutoComplete from "../../components/CustomAutoComplete";
import { api } from "../../config/api";
import CustomDateTimeInput from "../../components/CustomDateTimeInput";
import moment from "moment";
import swal from "sweetalert";

const ClinicPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [userValue, setUserValue] = useState({});
    const [schedule, setSchedule] = useState(moment());

    const handleSubmitSchedule = () => {
        api.post("services/scheduleclinic", {
            user_id: userValue.value,
            schedule: schedule,
        }).then((response) => {
            swal({
                icon: "success",
                title: "Success!",
                text: "Clinic appointment has been scheduled!",
                buttons: false,
            }).then((response) => {
                window.location.reload();
            });
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
            <CustomToast />
            <CustomBackTitle
                title={`Clinic`}
                url={() => window.location.replace("/services")}
            />
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
                        Clinic Reservation
                    </Typography>
                    <div className="grid grid-cols-1 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomAutoComplete
                                label={`Name`}
                                value={userValue.label}
                                onChange={(e, value) => {
                                    setUserValue(value);
                                }}
                                options={allUsers}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomDateTimeInput
                                label={`Schedule`}
                                my={1.5}
                                value={schedule}
                                onChangeValue={(value) => setSchedule(value)}
                            />
                        </div>
                    </div>
                </Card>
                <Button
                    variant="contained"
                    fullWidth
                    style={{ marginTop: 10 }}
                    onClick={handleSubmitSchedule}
                >
                    SUBMIT RESERVATION
                </Button>
            </div>
        </div>
    );
};

export default ClinicPage;

if (document.getElementById("ClinicPage")) {
    const element = document.getElementById("ClinicPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <ClinicPage {...props} />,
        document.getElementById("ClinicPage")
    );
}
