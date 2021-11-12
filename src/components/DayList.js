import React from "react";
import DayListItem from "../components/DayListItem";

export default function DayList(props) {

   let days = props.days.map(function(day){
         return (<DayListItem 
          key={day.id}
          id={day.name}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay} 
          />
   )})

   return (
      <ul>
         {days}
      </ul>
   );
 }