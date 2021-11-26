import React from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  

  function save(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer
    };
    
    transition(SAVING)
    props.bookInterview(props.id, newInterview).then(() => {
      transition(SHOW)
    })
  }

  function deleting(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer
    };
    
    transition(DELETE)
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY)
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time}> </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && <Status/>}
      {mode === SHOW && 
      ( <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={deleting}
      />
      )}
      {mode === DELETE && <Status message="Deleting"/>}
    </article>
  );
 }
