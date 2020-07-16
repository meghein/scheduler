import React from "react";
import classNames from 'classnames';
import "./DayListItem.scss"

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  function formatSpots(num) {
    if (num === 0) {
      return "no spots remaining";
    } else if (num === 1) {
      return `${num} spot remaining`;
    } else {
      return `${num} spots remaining`;
    }
  };
  
  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};

