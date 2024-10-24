
// controllers/taskController.ts
import { Request, Response } from "express";
import { TaskManager } from "../model/index";

const manager = new TaskManager();

export const loadTodo = async (req: Request, res: Response) => {
    try {
        const tasks = manager.getAllTasks();
        res.render('index', { tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading tasks");
    }
};

export const addTaskTitle = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const newTask = manager.addTask(title);
        res.status(200).json({ 
            message: "Task added successfully",
            task: newTask 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding task" });
    }
};

export const deleteTitle = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = manager.deleteTask(id);
        if (deleted) {
            res.status(200).json({ 
                // message: 'Task deleted successfully!',
                tasks: manager.getAllTasks() // Send updated task list
            });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = manager.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

// Add new controller method for updating task status
export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updatedTask = manager.completeTask(id);
        
        if (updatedTask) {
            // Return both the updated task and the full list of tasks
            res.status(200).json({
                message: 'Task status updated successfully',
                task: updatedTask,
                tasks: manager.getAllTasks() // Include full list for frontend sync
            });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task status' });
    }
};