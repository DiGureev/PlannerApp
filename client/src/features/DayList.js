import Tasks from "./Tasks"
import { useSelector, useDispatch} from "react-redux"
import {plannerState} from './plannerSlice.js'
import {delAllDay} from './plannerSlice.js'



const DayList = (props) => {
    const planner = useSelector(plannerState)
    console.log(planner)
    
    const dispatch = useDispatch()
    
    return (
        <div className="cardsContainer">
        {planner.map((item, index) => {
   
                if (item.tasks.length > 0) {
                    return <div key={index} className="cardDay">
                            <button onClick={()=> dispatch(delAllDay(item.date))}>Delete All Day</button>
                            <h3 style={{margin:'10px', marginBottom:'0px'}}>{item.date}</h3>
                            <Tasks date={item.date} tasks={item.tasks}/>
                            </div>
                            }
                        })
                    }
        </div>
    )
}
    

export default DayList