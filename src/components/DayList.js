import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const parsedDays = props.days && props.days.map(day => {
    return < DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.days}
      setDay={props.setDay}
    />
  })
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}