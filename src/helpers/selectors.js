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
  console.log(filteredState)

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

  //if there is no interview scheduales return null
  if(interview === null){return(null)}

  let interviewerID = interview.interviewer  
  interview.interviewer = state.interviewers[interviewerID]

  //return new object that has interview information and student information
  let returnObject = {  
    "student": interview.student,
    "interviewer": {  
      "id": state.interviewers[interviewerID].id,
      "name": state.interviewers[interviewerID].name,
      "avatar": state.interviewers[interviewerID].avatar
    }
  }

  return(returnObject)
}