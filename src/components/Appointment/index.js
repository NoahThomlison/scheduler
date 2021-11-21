import React from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  

  return (
    <article className="appointment">
      <Header time={props.time}> </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={[]} onCancel={back}/>}
      {mode === SHOW && 
      ( <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
      )}
    </article>
  );
 }
