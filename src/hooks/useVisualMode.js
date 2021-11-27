import { useState } from "react"

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    setMode(newMode)

    //if replace true then replace last value in history with new value
    if(replace) {setHistory(
      (prevState) => ([...prevState.slice(0, prevState.length-1)]))}

    //set history to new array with newMode added
    setHistory((prevState) => 
      ([...prevState, newMode])
    )

  }

  function back () {
    //check to confirm that back does not go to far back
    if(history.length === 1){return}

    //set mode to second last place in history
    setMode(history[history.length-2])

    //set history to previous value -1 value
    setHistory((prevState) => {
      return([...prevState.slice(0, prevState.length-1)])
    })
  }
  
  return { mode, transition, back }
}