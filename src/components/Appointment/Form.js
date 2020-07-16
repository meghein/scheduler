import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  };

  function cancel() {
    props.onCancel();
    reset();
  };

  function save() {
    props.onSave(name, interviewer);
  };

  function validate() {
    if (!name) {
      return setError("Student name cannot be blank");
    }
    /*
    This if statement breaks the compass provided Form and Application test code (lines commented out in both).
    In compass, this edge case is not taken in to consideration.
    If lines 33-35 are commented out, the test code (that is currently commented out)passes.
    */
    if (!interviewer) {
      return setError("Please choose an interviewer");
    }
    setError("") // This line of code is needed for tests to pass, seemingly redundant though.
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm save={save} onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
};