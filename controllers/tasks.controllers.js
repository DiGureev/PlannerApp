import {_getAllTasks, _getOneday, _addTask, _editTask, _deleteTask, _deleteAllTasksDay} from '../models/tasks.models.js'

export const getAllTasks = async (req, res) => {
    try{
      const data = await _getAllTasks()
      res.json(data);
    }catch (e) {
      console.log(e)
      res.status(404).json({msg: "No Tasks"});
    }
  };

export const getOneday = async (req, res) => {
try{
    const { date } = req.params;
    const data = await _getOneday(date)
    res.json(data);
}catch (e) {
    console.log(e)
    res.status(404).json({msg: "You don't have any tasks on this day"});
}
};


export const addTask = async (req, res) => {
    try{
      const {date, task} = req.body
      console.log(req.body)
      const data = await _addTask(date, task)
      res.json(data)
    }catch (e) {
      console.log(e)
      res.status(404).json({msg: "Can not add the task"});
    }
}

export const updateTask = async (req, res) => {
    const { date } = req.params;
    const {oldTask, newTask} = req.body

    console.log(date, oldTask, newTask)
    try{
      const data = await _editTask(date, oldTask, newTask)
      getAllTasks(req, res)
    }catch (e) {
      console.log(e)
      res.status(404).json({msg: "No tasks to edit"});
    }
  };
  
export const deleteTask = async (req, res) => {
    const { date } = req.params;
    console.log(req.body)
    const {task} = req.body
    try {
    let data = await _deleteTask(date, task)
    getAllTasks(req, res)
    }catch(e){
    console.log(e)
    res.status(404).json({msg: "No tasks to delete"});
    }
};

export const deleteDay = async (req, res) => {
  const { date } = req.params;
  try {
  let data = await _deleteAllTasksDay(date)
  getAllTasks(req, res)
  }catch(e){
  console.log(e)
  res.status(404).json({msg: "No tasks to delete"});
  }
};