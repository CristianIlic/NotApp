import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
});


const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023, 5, 0),
    end: new Date(2023, 5, 0),
  },
  {
    title: "Big Meeting 2",
    allDay: true,
    start: new Date(2023, 7, 0),
    end: new Date(2023, 7, 0),
  },
  {
    title: "Big Meeting 3",
    allDay: true,
    start: new Date(2023, 8, 0),
    end: new Date(2023, 9, 0),
  },
];

const Calendario = () => {
    const localizer = momentLocalizer(moment);
  
    const eventos = [
      {
        id: 1,
        title: 'Evento 1',
        start: new Date(2023, 4, 15, 10, 0),
        end: new Date(2023, 4, 15, 12, 0),
      },
      {
        id: 2,
        title: 'Evento 2',
        start: new Date(2023, 4, 16, 14, 0),
        end: new Date(2023, 4, 16, 16, 0),
      },
    ];
  
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          messages={{
            allDay: 'Todo el día',
            previous: 'Anterior',
            next: 'Siguiente',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'No hay eventos en este rango',
            showMore: (total) => `+${total} más`,
          }}
        />
      </div>
    );
  };
  
export default Calendario;