import React from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import { useState, useEffect } from "react";
import  Appointment from "../components/Appointment/"
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  const setDay = (day) => setState({ ...state, day });
      
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
   return axios.put(`/api/appointments/${id}`, {interview} ).then((res) => {
     console.log(res)
     const appointment = {
       ...state.appointments[id],
       interview: { ...interview }
     };
     const appointments = {
       ...state.appointments,
       [id]: appointment
     };
     setState({
       ...state, 
       appointments})
     })
   }

   function cancelInterview (id) {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      console.log(res)
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state, 
        appointments})
      })
    }
 

  let appointmentsArray = (dailyAppointments).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}

      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment time="5pm" key="last"/>
      </section>
    </main>
  );
}