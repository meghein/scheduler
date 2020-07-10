import React from "react";
import "./styles.scss";
import Empty from "./Empty"
import Show from "./Show"
import Header from "./Header"
import Form from "./Form"
import Confirm from "./Confirm"
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  // const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE)
  }

  function onCancel() {
    back()
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function onDelete() {
    transition(CONFIRM)
  }

  function onConfirm() {
    transition(DELETING);

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  // function onComplete() {
  //   transition(SAVING)
  // }

  // function onDelete() {
  //   transition(CONFIRM)
  // }

  // function onEdit() {
  //   transition(EDIT)
  // }

  // function onConfirm() {
  //   transition(DELETING)
  // }

  // function onComplete() {
  //   transition(SAVING)
  //   transition(EMPTY)
  // }
 

  return (
  <>
  <Header time={props.time}/>
  <article className="appointment">
    {mode === EMPTY && <Empty onAdd={onAdd} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={onDelete}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={onCancel}
        onSave={save}
      />
    )}
    {mode === SAVING && (
      <Status
        message="Saving"
      />
    )}
    {mode === DELETING && (
      <Status
        message="Deleting"
      />
    )}
    {mode === CONFIRM && (
      <Confirm
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    )}
  </article>
  </>
  )
}