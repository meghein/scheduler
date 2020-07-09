export function getAppointmentsForDay(state, day) {
  const currentDay = state.days.find(({name}) => name === day)

  const appointments = currentDay ? currentDay.appointments.map(appointmentId => state.appointments[appointmentId]) : []

  return appointments
}

export function getInterview(state, interview) {

  return interview ? {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    } : null

}
