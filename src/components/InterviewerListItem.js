import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem;

export default function DayListItem(props) {

  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };
  

  //  let dayClass = classNames("day-list__item", {'day-list__item--selected': props.selected}, {'day-list__item--full': !props.spots});
  //  let spotsMessage = 2

  //  const formatSpots = () => {
  //     if (props.spots ===  1){
  //        spotsMessage = 1
  //      }

  //     if (props.spots === 0){
  //        spotsMessage = 0
  //     }
  //  } 

  //  formatSpots()

   return (

<li className="interviewers__item">
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  Sylvia Palmer
</li>
   );
 }