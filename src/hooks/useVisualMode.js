import {useState} from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    replace ? setHistory(prev => ([...prev, mode])) : setHistory([...history, newMode])
    
  }

  function back() {
    const tempHistory = [...history];
    tempHistory.pop();
    setHistory(tempHistory)
    tempHistory.length > 1 ? setMode(tempHistory[tempHistory.length - 1]) : setMode(initial)
  }

  return { mode, transition, back };
}