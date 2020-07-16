const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return ({ ...state, day: action.day });
    
    case SET_APPLICATION_DATA:
      return ({ ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers });
    
    case SET_INTERVIEW: {
      const id = action.id;
      const interview = action.interview;

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
};

// Helper function to synchronize spots updating when appointments are booked/canceled
function getUpdatedDays(state, newAppointments) {
  return state.days.map((day, index) => {
    let freeSpots = 0;
    for (let key of state.days[index].appointments) {
      if (newAppointments[key].interview === null) {
        freeSpots++
      }
    };
    const newDay = {...day, spots: freeSpots};
    return newDay;
  })
};

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };