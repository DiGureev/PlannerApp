import { createSlice } from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initState = {
    planner:[],
    oneDay:[],
    status: ''
};

const BASE_URL = 'https://my-planner-app-node-redux.onrender.com/api/planner';

export const fetchAll = createAsyncThunk('planner/fetchall', async()=>{
    const response = await axios.get(`${BASE_URL}/`)
    return response.data
  })

export const fetchOneDay = createAsyncThunk('planner/fetchone', async(date)=>{
const response = await axios.get(`${BASE_URL}/${date}`)
return response.data
})

export const addTask = createAsyncThunk('planner/addtask', async(data)=>{
const {date,task} = data
const response = await axios.post(`${BASE_URL}/`, {date,task})
return response.data
})

export const editTask = createAsyncThunk('planner/edittask', async(data)=>{
    const {date,oldTask, newTask} = data
    const response = await axios.put(`${BASE_URL}/${date}`, {oldTask, newTask})
    return response.data
})

export const delTask = createAsyncThunk('planner/deletetask', async(data)=>{
    const {date,task} = data
    console.log(task)
    const response = await axios.post(`${BASE_URL}/${date}`, {task})
    return response.data
})

export const delAllDay = createAsyncThunk('planner/deleteday', async(date)=>{
    const response = await axios.delete(`${BASE_URL}/all/${date}`)
    return response.data
})

export const plannerSlice = createSlice({
    name: 'planner',
    initialState: initState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(fetchAll.fulfilled, (state, action) => {
            console.log('payload',action.payload)
            state.planner = getCleanData(action.payload)
          })
        .addCase(addTask.fulfilled, (state, action) =>{
            state.status = 'added'
        })
        .addCase(editTask.fulfilled, (state,action) => {
            state.planner = getCleanData(action.payload)
        })
        .addCase(delTask.fulfilled, (state,action) => {
            state.planner = getCleanData(action.payload)
        })
        .addCase(delAllDay.fulfilled, (state,action) => {
            state.planner = getCleanData(action.payload)
        })
    }
})

const getCleanData = (arr)=>{
    let date = null
    let tasks = []
    let newArr = []

    arr.map((item,index) => {
        console.log('item',item)
        if (date === null) {
            date = (new Date (item.date)).toString().slice(0,15)
        }

        if (date != (new Date (item.date)).toString().slice(0,15)){
            console.log('I am in not ')
            let newObj = {date, tasks}
            newArr.push(newObj)
            console.log('New Obj',newObj)
            date = (new Date (item.date)).toString().slice(0,15);
            tasks=[]

            tasks.push(item.task)

            if (index===arr.length-1){
                console.log('I am undefined')
                let newObj = {date, tasks}
                newArr.push(newObj)
            }

        } else {
            console.log('I am in yes ')
            tasks.push(item.task)

            if (index===arr.length-1){
                console.log('I am undefined')
                let newObj = {date, tasks}
                newArr.push(newObj)
            }
        }
    })

    return newArr
}

export default plannerSlice.reducer

export const plannerState = (state)=> state.planner.planner
export const oneDayState = (state)=> state.planner.oneDay

