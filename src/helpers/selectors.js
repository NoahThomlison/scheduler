export function getAppointmentsForDay (state, day) {
  //empty array to hold results
  let appointments = []

  // filter the data to matching state.name with day given
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

export function getInterviewersForDay (state, day) {
  //empty array to hold results
  let interviewers = []

  // filter the data to matching state.name with day given
  const filteredState = state.days.filter(state => state.name === day)

  //if filtered data is empty, return
  if(filteredState.length < 1){return(interviewers)
  }
  
  // //loop through filtered data and if the appointmentID matches a day push it to the appointments array
  filteredState[0].interviewers.forEach((interviewer) => {
    if(state.interviewers[interviewer]){interviewers.push(state.interviewers[interviewer])}
  })

  return(interviewers)
}

//function which returns interview object if an interview is scheduled
export function getInterview (state, interview) {

 //if no interview scheduled return null
  if(!interview){return(null)}

  //get interviewerID
  let interviewerID = interview.interviewer  

  //create new object with old interivew data and new interviwer data
  let returnObject = {...interview, interviewer: state.interviewers[interviewerID]}

  return(returnObject)
}