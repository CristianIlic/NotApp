import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { useFirestoreCollectionData, useFirestore } from "reactfire";

const Calendario = () => {
  const calendarioRef = collection(useFirestore(), "calendario");
  const { status, data: calendario } =
    useFirestoreCollectionData(calendarioRef);
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  const infoCalendario = calendario.map(({ title, date }) => {
    const fechaTransformada = date.toDate();
    return { title, date: fechaTransformada };
  });
  const db = getFirestore();
  // ASI OBTENIAMOS LOS EVENTOS ANTES DE LA CONEXION A FIREBASE, LLAMANDO EVENTS EN EL RETURN DE ABAJO

  // const [events, setEvents] = useState([
  //   { title: "evento 1", date: "2023-06-19" },
  //   { title: "evento 2", start: "2023-06-24", end: "2023-06-26" },
  // ]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  async function handleAddEvent(eventName) {
    console.log("FECHA SELESIONA", selectedDate);
    if (selectedDate) {
      await setDoc(doc(db, "calendario", "PEITO"), {
        title: infoCalendario.title,
        date: infoCalendario.date,
      });

      setEvents((prevEvents) => [...prevEvents, newEvent]);

      console.log("New event:", newEvent);
    }
  }

  const handleDeleteEvent = (info) => {
    const { event } = info;
    setEvents((prevEvents) => prevEvents.filter((e) => e !== event));
    console.log("Deleted event:", event);
  };

  const handleDayCellDidMount = (dayCellInfo) => {
    const { date, dayEl } = dayCellInfo;

    if (selectedDate === date.toISOString().split("T")[0] && dayEl) {
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
        events={infoCalendario}
        height={"90vh"}
      />
    </div>
  );
};

export default Calendario;
