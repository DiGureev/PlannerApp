import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import {editTask, delTask} from './plannerSlice.js'


const Tasks = (props) => {
    const {date, tasks} = props
    const dispatch = useDispatch()

    const [display, setDisplay] = useState('none')
    const [dispEdit, setDispEdit] = useState('')
    const [newText, setNewText] = useState('')

    const handleClick= (element) => {
        dispatch(editTask({date: date, oldTask:element, newTask: newText}))
        setDisplay('none')
        setDispEdit('')
    }

    const handleEditButton = ()=>{
        setDisplay('')
        setDispEdit('none')
    }


    return (
        <>
        {
            tasks.map((item, index) => {
                    return <div key={index}>
                            <div style={{display: 'flex', direction:'row'}}>
                            <input style={{margin:'20px'}} type="checkbox"></input>
                            <p>{item}</p>
                            </div>

                            <button style={{display: dispEdit}} onClick={handleEditButton}>Edit</button>
                            <div style={{display: display}}>
                            <input onChange={(e)=>setNewText(e.target.value)}/>
                            <button onClick={()=>handleClick(item)}>Done</button>
                            </div>
                            <button onClick={()=> dispatch(delTask({date,task: item}))}>Remove</button>
                        </div>
                })
            }
        </>
    )
}

export default Tasks