import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendario = () => {
  const [events, setEvents] = useState([
    { title: "evento 1", date: "2023-05-19" },
    { title: "evento 2", start: "2023-05-08", end: "2023-05-13" },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const handleAddEvent = (eventName) => {
    if (selectedDate) {
      const newEvent = {
        title: eventName,
        date: selectedDate,
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);

      console.log("New event:", newEvent);
    }
  };

  const handleDeleteEvent = (info) => {
    const { event } = info;
    setEvents((prevEvents) => prevEvents.filter((e) => e !== event));
    console.log("Deleted event:", event);
  };

  const handleDayCellDidMount = (dayCellInfo) => {
    const { date } = dayCellInfo;
    
    if (selectedDate === date.toISOString().split("T")[0]) {
      dayCellInfo.dayEl.style.backgroundColor = "#faedcb";
    }
  };

  return (
    <div className="body-calendario">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        dateClick={(info) => handleDateClick(info)}
        eventClick={(info) => handleDeleteEvent(info)}
        dayCellDidMount={(dayCellInfo) => handleDayCellDidMount(dayCellInfo)}
        customButtons={{
          addEventButton: {
            text: "Agregar Evento",
            click: () => {
              const eventName = prompt("Especifíca el nombre del nuevo evento:");
              handleAddEvent(eventName);
            },
          },
        }}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay addEventButton",
        }}
        events={events}
        height={"90vh"}
      />
    </div>
  );
};

export default Calendario;
