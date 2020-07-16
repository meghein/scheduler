import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

// Custom hook to manage api data throughout the app
// Added stretch exercises with reducer and websocket
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

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

  useEffect(() => {
    const daysAPI = axios.get(`/api/days`);
    const appointmentsAPI = axios.get(`/api/appointments`);
    const interviewersAPI = axios.get(`/api/interviewers`);
    Promise.all([daysAPI, appointmentsAPI, interviewersAPI]).then(all => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);

  useEffect(() => {
    console.log(process.env.REACT_APP_WEBSOCKET_URL)
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onmessage = (event) => {
      const { type, id, interview } = JSON.parse(event.data);
      if (type === SET_INTERVIEW) {
      dispatch({ type: SET_INTERVIEW, id, interview });
      }
    }
    return () => {
      webSocket.close();
    };
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
};

