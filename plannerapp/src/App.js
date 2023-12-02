import './App.css';
import {useState, useEffect } from 'react';
import {useDispatch } from 'react-redux';
import {fetchAll, addTask } from './features/plannerSlice.js';

import DayList from './features/DayList.js';


function App() {
  const dispatch = useDispatch()

  const [task, setTask] = useState('')
  const [date, setDate] = useState('')
  const [display, setDisplay] = useState('hidden')

  useEffect(()=>{
    dispatch(fetchAll())
  },[display])

  const handleClick = () => {
      setDisplay('')
      dispatch(addTask({date, task}))
      setTimeout(()=>{
          setDisplay('hidden')
      }, 1000)

      setTask('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>My PlannerApp</h1>
        <>
        <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
        <input type="text" value={task} onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={handleClick}>Add Task</button>
        <div style={{visibility: display}}>Added</div>
        </>

       <DayList/>

      </header>
    </div>
  );
}

export default App;
