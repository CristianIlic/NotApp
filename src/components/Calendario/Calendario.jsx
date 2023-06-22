import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { collection, getFirestore, addDoc } from "firebase/firestore";
import { useFirestoreCollectionData, useFirestore } from "reactfire";
import { Spinner } from "@chakra-ui/react";


const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarioRef = collection(useFirestore(), "calendario");
  const { status, data: calendario } =
    useFirestoreCollectionData(calendarioRef);
  const db = getFirestore();

  const handleDateClick = (info) => {
    setSelectedDate(new Date(info.dateStr));
  };

  async function handleAddEvent(eventName) {
    if (selectedDate) {
      await addDoc(collection(db, "calendario"), {
        title: eventName,
        date: selectedDate,
      });
    }
  }

  async function handleDeleteEvent(info) {
    await deleteDoc(collection(db, "calendario"), {});
  }

  const handleDayCellDidMount = (dayCellInfo) => {
    const { date, dayEl } = dayCellInfo;

    if (selectedDate === date.toISOString().split("T")[0] && dayEl) {
      dayCellInfo.dayEl.style.backgroundColor = "#faedcb";
    }
  };
  if (status === "loading") {
    return <Spinner color="primary" />;
  }

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
              const eventName = prompt(
                "Especifíca el nombre del nuevo evento:"
              );
              handleAddEvent(eventName);
            },
          },
        }}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay addEventButton",
        }}
        events={calendario.map(({ title, date }) => {
          const fechaTransformada = date.toDate();
          return { title, date: fechaTransformada };
        })}
        height={"90vh"}
      />
    </div>
  );
};

export default Calendario;
