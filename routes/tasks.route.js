import express from "express";
import {
    getAllTasks,
    getOneday,
    addTask,
    updateTask,
    deleteTask,
    deleteDay
} from '../controllers/tasks.controllers.js';

export const router = express.Router();

router.get("/", getAllTasks);
router.get("/:date", getOneday);
router.post("/", addTask);
router.put("/:date", updateTask);
router.post("/:date", deleteTask);
router.delete("/all/:date", deleteDay);

