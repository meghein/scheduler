export function getAppointmentsForDay(state, day) {
  const currentDay = state.days.find(({name}) => name === day)

  const appointments = currentDay ? currentDay.appointments.map(appointmentId => state.appointments[appointmentId]) : []

  return appointments
}

