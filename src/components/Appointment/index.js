import React from "react";
import "./styles.scss";
import Empty from "./Empty"
import Show from "./Show"
import Header from "./Header"

export default function Appointment(props) {
  const showInterviews = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />
  
  return (
  <>
  <Header time={props.time}/>
  <article className="appointment">
    {showInterviews}
  </article>
  </>
  )
}