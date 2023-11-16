import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomToast from "../../components/CustomToast";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import { Button, Card } from "@mui/material";
import { api } from "../../config/api";
import CustomAutoComplete from "../../components/CustomAutoComplete";
import CustomDateTimeInput from "../../components/CustomDateTimeInput";
import moment from "moment";
import CustomTextInput from "../../components/CustomTextInput";
import RoomIcon from "@mui/icons-material/Room";
import {
    Circle,
    MapContainer,
    TileLayer,
    useMap,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { toast } from "react-toastify";

function LocationMarker({ coords, setCoords, center }) {
    // const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            setCoords(e.latlng);
        },
        // dragend(e) {
        //     map.flyTo([center.lat, center.lng], map.getZoom());
        // },
    });

    return coords === null ? null : (
        <Circle
            center={[coords.lat, coords.lng]}
            pathOptions={{ color: "red" }}
            radius={100}
        />
    );
}

const TanodDeploymentPage = (props) => {
    const [tanod, setTanod] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedTanod1, setSelectedTanod1] = useState("");
    const [selectedTanod2, setSelectedTanod2] = useState("");
    const [dateTimeDeployment, setDateTimeDeployment] = useState(moment());
    const [description, setDescription] = useState("");
    const [iconCoords, setIconCoords] = useState({
        lat: 14.584215,
        lng: 121.07508,
    });
    const center = {
        lat: 14.584215,
        lng: 121.07508,
    };

    const handleSubmitDeployment = () => {
        if (selectedTanod1 == "" || selectedTanod2 == "" || description == "") {
            toast("Please fill in the form!", {
                type: "error",
            });
        } else if (selectedTanod1 == selectedTanod2) {
            toast("You cannot have the same tanod!", {
                type: "error",
            });
        } else {
            api.post("tanoddeployment/tanoddeployment", {
                tanod1_id: selectedTanod1.value,
                tanod2_id: selectedTanod2.value,
                date_time_deployment: moment(dateTimeDeployment).format(
                    "YYYY-MM-DD hh:mm:ss.SSS"
                ),
                description: description,
                coordinates_lat: iconCoords.lat,
                coordinates_lng: iconCoords.lng,
            })
                .then((response) => {
                    console.log(response.data);
                    toast("Tanod deployed!", {
                        type: "success",
                    });
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    };

    useEffect(() => {
        api.get("tanoddeployment/getallstaff")
            .then((response) => {
                const tanodList = response.data;
                let temp = [];
                tanodList.map((item, index) => {
                    temp = [...temp, { label: item.name, value: item.id }];
                });
                setTanod(temp);
            })
            .catch((err) => {
                console.log(err.response);
            });
        api.get("tanoddeployment/getalltanoddeployments")
            .then((response) => {
                setAreas(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <div className="px-10 py-4">
            <CustomToast />
            <CustomBackTitle title={`Tanod Deployment`} url={"/home"} />
            <Card
                sx={{
                    paddingTop: 3,
                    paddingBottom: 3,
                    paddingLeft: 5,
                    paddingRight: 5,
                }}
            >
                {JSON.parse(props.user).user_role != 4 ? (
                    <div className="grid grid-cols-1 gap-4 my-5">
                        <div className="col-span-1">
                            <CustomAutoComplete
                                label={`Selected Tanod`}
                                value={selectedTanod1.label}
                                onChange={(e, value) => {
                                    setSelectedTanod1(value);
                                }}
                                options={tanod}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomAutoComplete
                                label={`Selected Tanod`}
                                value={selectedTanod2.label}
                                onChange={(e, value) => {
                                    setSelectedTanod2(value);
                                }}
                                options={tanod}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomDateTimeInput
                                label={`Date and Time of Deployment`}
                                value={moment(dateTimeDeployment)}
                                onChangeValue={(value) => {
                                    setDateTimeDeployment(value);
                                }}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                value={description}
                                label={`Description`}
                                onChangeValue={(e) =>
                                    setDescription(e.target.value)
                                }
                                multiline
                            />
                        </div>
                        <div className="col-span-1 h-60 lg:h-80 w-full">
                            <MapContainer
                                style={{ height: "100%", width: "100%" }}
                                center={[center.lat, center.lng]}
                                zoom={14.5}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {areas.length > 0 &&
                                    areas.map((item, index) => {
                                        console.log(item);
                                        return (
                                            <Circle
                                                key={index}
                                                center={[
                                                    Number(
                                                        item.coordinates_lat
                                                    ),
                                                    Number(
                                                        item.coordinates_lng
                                                    ),
                                                ]}
                                                pathOptions={{
                                                    color: "orange",
                                                }}
                                                radius={100}
                                            />
                                        );
                                    })}
                                <LocationMarker
                                    coords={iconCoords}
                                    setCoords={setIconCoords}
                                    center={center}
                                />
                            </MapContainer>
                        </div>
                    </div>
                ) : (
                    <div className="h-60 lg:h-80 w-full">
                        <MapContainer
                            style={{ height: "100%", width: "100%" }}
                            center={[center.lat, center.lng]}
                            zoom={14.5}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {areas.length > 0 &&
                                areas.map((item, index) => {
                                    console.log(item);
                                    return (
                                        <Circle
                                            key={index}
                                            center={[
                                                Number(item.coordinates_lat),
                                                Number(item.coordinates_lng),
                                            ]}
                                            pathOptions={{ color: "orange" }}
                                            radius={100}
                                        />
                                    );
                                })}
                        </MapContainer>
                    </div>
                )}
            </Card>
            {JSON.parse(props.user).user_role != 4 ? (
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmitDeployment}
                    sx={{ marginTop: 2 }}
                >
                    SUBMIT
                </Button>
            ) : null}
        </div>
    );
};

export default TanodDeploymentPage;

if (document.getElementById("TanodDeploymentPage")) {
    const element = document.getElementById("TanodDeploymentPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <TanodDeploymentPage {...props} />,
        document.getElementById("TanodDeploymentPage")
    );
}
