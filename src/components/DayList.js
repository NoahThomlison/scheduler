import React from "react";
import DayListItem from "../components/DayListItem";

export default function DayList(props) {

   return (
      <ul>
         {props.days.map(function(element, index){
           return <DayListItem 
            key={props.days[index].id}
            name={props.days[index].name} 
            spots={props.days[index].spots} 
            selected={props.days[index].name === props.day}
            setDay={props.setDay} 
            />
         })}
      </ul>
   );
 }