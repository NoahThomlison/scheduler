import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

   let dayClass = classNames("day-list__item", {'day-list__item--selected': props.selected}, {'day-list__item--full': !props.spots});
   let spotsMessage = 2

   const formatSpots = () => {
      if (props.spots ===  1){
         spotsMessage = 1
       }

      if (props.spots === 0){
         spotsMessage = 0
      }
   } 

   formatSpots()

   return (
      <li onClick={props.setDay} className={dayClass} data-testid="day">
      <h2 className="text--light">{props.name}</h2>
      {spotsMessage === 2 && <h3 className="text--regular">{props.spots} spots remaining</h3>}
      {spotsMessage === 1 && <h3 className="text--regular">{props.spots} spot remaining</h3>}
      {spotsMessage === 0 && <h3 className="text--regular">no spots remaining</h3>}
     </li>
   );
 }