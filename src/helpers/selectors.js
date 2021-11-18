export function getAppointmentsForDay (state, day) {
  //empty array to hold results
  let appointments = []

  //filter the data to matching state.name with day given
  const filteredState = state.days.filter(state => state.name === day)

  //if filtered data is empty, return
  if(filteredState.length < 1){return(appointments)
  }

  //loop through filtered data and if the appointmentID matches a day push it to the appointments array
  filteredState[0].appointments.forEach((appointmentID) => {
    if(state.appointments[appointmentID]){appointments.push(state.appointments[appointmentID])}
  })

  return(appointments)
}