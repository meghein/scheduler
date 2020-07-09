import React from "react";
import "./styles.scss";
import Empty from "./Empty"
import Show from "./Show"
import Header from "./Header"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  // const EDIT = "EDIT";
  // const CONFIRM = "CONFIRM";
  // const SAVING = "SAVING";
  // const DELETING = "DELETING";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE)
  }

  // function onComplete() {
  //   transition(SAVING)
  //   transition(EMPTY)
  // }

  function onCancel() {
    back()
  }

  // function onSave() {
  //   transition(SAVING)
  // }

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
  
  return (
  <>
  <Header time={props.time}/>
  <article className="appointment">
    {mode === EMPTY && <Empty onAdd={onAdd} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={[]}
        onCancel={onCancel}
      />
    )}
  </article>
  </>
  )
}