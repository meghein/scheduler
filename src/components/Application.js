import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysAPI = axios.get(`/api/days`);
    const appointmentAPI = axios.get(`api/appointments/`);
    Promise.all([daysAPI, appointmentAPI]).then(all => {
      console.log(all)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data}))
    });
  })
  
  const parsedAppointments = getAppointmentsForDay(state, state.day).map(appointment => <Appointment key={appointment.id} {...appointment} />)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          <ul>
            {parsedAppointments}
          </ul>
      </section>
    </main>
  );
}
