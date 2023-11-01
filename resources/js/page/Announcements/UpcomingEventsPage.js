import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { api } from "../../config/api";

const UpcomingEventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get("announcements/getallevents")
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
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    );
};

export default UpcomingEventsPage;

if (document.getElementById("UpcomingEventsPage")) {
    ReactDOM.render(
        <UpcomingEventsPage />,
        document.getElementById("UpcomingEventsPage")
    );
}
