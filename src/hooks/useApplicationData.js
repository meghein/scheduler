import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return ({ ...state, day: action.day });
      
      case SET_APPLICATION_DATA:
        return ({ ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers });
      
      case SET_INTERVIEW: {
        const id = action.id
        const interview = action.interview

        const appointment = {
          ...state.appointments[id],
          interview: interview ? { ...interview } : null
        };
    
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
    
        const days = getUpdatedDays(state, appointments);

        return ({ ...state, appointments, days });
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  function getUpdatedDays(state, newAppointments) {
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
    return axios.put(`api/appointments/${id}`,  {interview} )
      .then(response => {
        if (response.status === 204) {
          dispatch({ type: SET_INTERVIEW, id, interview });
        }
      })
  }

  function cancelInterview(id) {
    return axios.delete(`api/appointments/${id}`)
    .then(response => {
      if (response.status === 204) {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      }
    })
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const daysAPI = axios.get(`/api/days`);
    const appointmentsAPI = axios.get(`/api/appointments`);
    const interviewersAPI = axios.get(`/api/interviewers`);
    Promise.all([daysAPI, appointmentsAPI, interviewersAPI]).then(all => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, [])

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    
    webSocket.onmessage = (event) => {
      const { type, id, interview } = JSON.parse(event.data);
      if (type === SET_INTERVIEW) {
      dispatch({ type: SET_INTERVIEW, id, interview });
      }
    }
  })

  

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}

