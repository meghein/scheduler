import React from "react";
import "./styles.scss";
import Empty from "./Empty"
import Show from "./Show"
import Header from "./Header"

export default function Appointment(props) {
  return (
  <>
  <Header time={props.time}/>
  <article className="appointment">
    {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}
  </article>
  </>
  )
}