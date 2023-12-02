import { db } from "../config/db.js";

export const _getAllTasks = () => {
    return db("planner").select('date', 'task').orderBy('date');
};
  
export const _getOneday = (date) => {
    return db("planner").select('task').where({ date });
};

export const _addTask = (date, task) => {
    return db("planner").insert({date, task}, ["date", "task"]);
};

export const _editTask = (date, oldTask, newTask) => {
    return db("planner").update({task: newTask}, ["task"]).where({date, task: oldTask});
};

export const _deleteTask = (date, task) => {
    return db("planner").where({date} && {task}).del().returning(['date', 'task']);
};

export const _deleteAllTasksDay = (date) => {
    return db("planner").where({ date }).del();
};


  