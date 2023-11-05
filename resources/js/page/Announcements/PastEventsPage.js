import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomBackTitle from "../../navigation/CustomBackTitle";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { api } from "../../config/api";

const PastEventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get("announcements/getpastevents")
            .then((response) => {
                const tempEvents = response.data;
                let allEvents = [];
                tempEvents.map((item, index) => {
                    allEvents.push(...allEvents, {
                        title: item.event_title,
                        start: item.event_start,
                        end: item.event_end,
                    });
                });
                setEvents(allEvents);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <div className="px-10 py-4">
            <CustomBackTitle
                title={`Incident Reports`}
                url={`/announcements`}
            />
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    );
};

export default PastEventsPage;

if (document.getElementById("PastEventsPage")) {
    ReactDOM.render(
        <PastEventsPage />,
        document.getElementById("PastEventsPage")
    );
}
