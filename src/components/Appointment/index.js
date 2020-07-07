import React from "react";
import "./styles.scss";
import Empty from "./Empty"
import Show from "./Show"
import Header from "./Header"

export default function Appointment(props) {
  // const {student, interviewer} = props
  
  return (
  <>
  <Header time={props.time}/>
  <article className="appointment">
    {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}
  </article>
  </>
  )
}

/*
All Appointment components will render a Header that takes in a time prop.
If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.


return (
    <div className="App" onClick={breakQuestionMark}>
      {tourneyStatus === 'pending' &&
        <>
          <h1 className={h1Class}>
            <span className="letter">F</span><span className="text">ighting</span>
            <span className="letter">G</span><span className="text">ame</span>
            <span className="letter">T</span><span className="text">ournament</span>
            <span className="letter">S</span><span className="text">ystem</span>
          </h1>
          <button onClick={startTourney}>Start!</button>
        </>
      }
      {
        // tourneyStatus === 'in_progress' && <Matches players={players} matches={matches}/>
        tourneyStatus === 'in_progress' && <Matches {...{ players, matches, addNewMatch, updateMatch }} />
      }
    </div>
  );
*/