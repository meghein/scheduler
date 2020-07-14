import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysAPI = axios.get(`/api/days`);
    const appointmentsAPI = axios.get(`/api/appointments`);
    const interviewersAPI = axios.get(`/api/interviewers`);
    Promise.all([daysAPI, appointmentsAPI, interviewersAPI]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, [])

  function getUpdatedDays(newAppointments) {
    return state.days.map((day, index) => {
      let freeSpots = 0;
      for (let key of state.days[index].appointments) {
        if (newAppointments[key].interview === null) {
          freeSpots++
        }
      }
      const newDay = {...day, spots: freeSpots}
      return newDay
    })
  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = getUpdatedDays(appointments)

    // let axiosMethod = interview ? axios.put : axios.delete

    // return axiosMethod(`api/appointments/${id}`,  appointment )
    return axios.put(`api/appointments/${id}`,  appointment )
      .then(
        setState({
          ...state,
          appointments,
          days: updatedDays,
        })
      )
  }

  function cancelInterview(id) {
    // return bookInterview(id)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = getUpdatedDays(appointments)

    return axios.delete(`api/appointments/${id}`, appointment)
      .then(
        setState({
          ...state,
          appointments,
          days: updatedDays,
        })
      )
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}