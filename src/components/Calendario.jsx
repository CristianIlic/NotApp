import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import React, {useState} from "react";
import ReactDatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay
})

const events = [
  {
  title: "Big Meeting",
  allDay: true,
  start: new Date(2023,5,0),
  end: new Date(2023,5,0)
  },
  {
  title: "Big Meeting 2",
  allDay: true,
  start: new Date(2023,7,0),
  end: new Date(2023,7,0)
  },
  {
  title: "Big Meeting 3",
  allDay: true,
  start: new Date(2023,8,0),
  end: new Date(2023,9,0)
  },
]



const Calendario = () => {


  return ( 
    <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
   );
}
 
export default Calendario;