// import { loadtodo } from './../Controllers/controller';
import * as taskController from '../Controllers/controller';
import express  from "express";
import path from "path";
export const router = express.Router();

// Route to render the main todo page
router.get('/', taskController.loadTodo);

// Route to fetch all tasks
router.get('/get-tasks', taskController.getTasks);

// Route to add a new task
router.post('/add-tasks', taskController.addTaskTitle);

// Route to delete a task
router.delete('/delete-task/:id', taskController.deleteTitle);

router.put('/update-task-status/:id', taskController.updateTaskStatus);