import React from 'react'
import "components/Appointment/styles.scss"
import Header from "./Header";
import Form from "./Form";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode"
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERRORSAVE = "ERRORSAVE"
  const ERRORDELETE = "ERRORDELETE"

  const deleteMessage = "Are you sure you would like to delete your appointment?"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  

  function save(name, interviewer) {
    const newInterview = {
      student: name,
      interviewer
    };
    
    transition(SAVING)

    props.bookInterview(props.id, newInterview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERRORSAVE, true));
  }

  function deleting(name, interviewer) {
    transition(DELETE, true)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)})
    .catch(error => {
      transition(ERRORDELETE, true)
    });
  }

  function confirm() {
    transition(CONFIRM)
  }

  function edit(name, interviewer) {
    transition(EDIT)
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}> </Header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}

      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save}/>}

      {mode === SAVING && <Status message="Saving"/>}
      {mode === ERRORSAVE && <Error message="Saving Failed" onClose={back}/>}

      {mode === SHOW && 
      ( <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onConfirm={confirm}
        onEdit={edit}
      />
      )}

      {mode === DELETE && <Status message="Deleting"/>}
      {mode === ERRORDELETE && <Error message="Deleting Failed" onClose={back}/>}

      {mode === CONFIRM && <Confirm message={deleteMessage} onCancel={back} onConfirm={deleting}/>}

    </article>
  );
 }