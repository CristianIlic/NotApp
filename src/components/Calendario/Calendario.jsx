import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

import {
  collection,
  getFirestore,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useOutletContext } from "react-router-dom";
import {
  useFirestoreCollectionData,
  useFirestore,
  useFirestoreDocData,
} from "reactfire";
import {
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";

const Calendario = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const calendarioRef = collection(useFirestore(), "calendario");
  const { status, data: calendario } =
    useFirestoreCollectionData(calendarioRef);
  const db = getFirestore();
  const { uid } = useOutletContext();

  const usuarioRef = doc(db, "usuario", uid);
  const { data: usuario, status: statusUsuario } =
    useFirestoreDocData(usuarioRef);

  const handleDateClick = (info) => {
    console.log("info", info);
    setSelectedDate(
      new Date(info.allDay ? `${info.dateStr} EDT` : info.dateStr)
    );
  };

  async function handleAddEvent(eventName) {
    if (selectedDate) {
      await addDoc(collection(db, "calendario"), {
        title: eventName,
        date: selectedDate,
      });

      setEventName("");
      onClose();
    }
  }

  async function handleDeleteEvent(info) {
    console.log("delete", info);
    // await deleteDoc(collection(db, "calendario"), {});
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
      {usuario?.rol === "profesor" ? (
        <FullCalendar
          locale={esLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          dateClick={(info) => handleDateClick(info)}
          eventClick={(info) => handleDeleteEvent(info)}
          dayCellDidMount={(dayCellInfo) => handleDayCellDidMount(dayCellInfo)}
          customButtons={{
            addEventButton: {
              text: "Agregar Evento",
              click: () => {
                onOpen();
                // handleAddEvent(eventName);
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
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locale={esLocale}
          initialView={"dayGridMonth"}
          dateClick={(info) => handleDateClick(info)}
          eventClick={(info) => handleDeleteEvent(info)}
          dayCellDidMount={(dayCellInfo) => handleDayCellDidMount(dayCellInfo)}
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
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleAddEvent(eventName)}
            >
              Agregar Evento
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Calendario;
