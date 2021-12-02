import axios from "axios";
import { useState, useEffect } from "react";
import {getAppointmentsForDay} from "../helpers/selectors"

export default function useApplicationData (initial) {

  //basic state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //calling API to return data for appointments, days and interviews and assigning them to state
  useEffect(() => {
    let appointsmentsUrl = 'http://localhost:8001/api/appointments'
    let daysUrl = 'http://localhost:8001/api/days'
    let interviewUrl = 'http://localhost:8001/api/interviewers'

    let daysPromise = axios.get(daysUrl)
    let appointmentsPromise = axios.get(appointsmentsUrl)
    let interviewsPromise = axios.get(interviewUrl)

    Promise.all([daysPromise, appointmentsPromise, interviewsPromise]).then((results) => {
      setState(prev => ({...prev, days: results[0].data, appointments: results[1].data, interviewers: results[2].data}))
    })
  }, [])

  //a function which will set the day into state
  const setDay = (day) => setState({ ...state, day });

  //function which updates the server with new interview bookings, rebuilds the state object and updates it, and also handles errors
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview} )
    .then((res) => {
      const appointment = {
         ...state.appointments[id],
         interview: { ...interview }
      };
      const appointments = {
         ...state.appointments,
         [id]: appointment
      };
      const days = updateSpots(id)
      setState({
         ...state, 
         appointments, days})
      })
     .catch((err) => {
      return(Promise.reject(err))
    })
   }

  //function which updates the server to cancel interview bookings, rebuilds th state object and updates it, and also handles errors
  function cancelInterview (id) {
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = updateSpots(id)

      setState({
        ...state, 
        appointments, days})
      })
      .catch((err) => {
        return(Promise.reject(err))
      })
      
    }
  

  function updateSpots (id) {

    const dailyAppointments = getAppointmentsForDay(state, state.day);
    let spots = 0
    let dayObject = {}
    let daysArray = []

    //loop through dailyAppointsments and could the number of null interviews
    for (const day of dailyAppointments) {
      if(day.interview === null){
        console.log('ding')
        spots += 1
      }
    }

    //swap value for given id
    (state.appointments[id].interview ? spots += 1 : spots -= 1)


    //rebuild state.day object but substititue spots for the one day in question
    for (const day of state.days) {
      if(day.name === state.day){
        dayObject = {...day, spots: spots}
      }
      else{
        dayObject = {...day}
      }
      daysArray.push(dayObject)
    }
    console.log(daysArray)

    return(daysArray)
  }

  return { state, setDay, bookInterview, cancelInterview }
}