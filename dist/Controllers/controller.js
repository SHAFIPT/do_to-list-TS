"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.getTasks = exports.deleteTitle = exports.addTaskTitle = exports.loadTodo = void 0;
const index_1 = require("../model/index");
const manager = new index_1.TaskManager();
const loadTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = manager.getAllTasks();
        res.render('index', { tasks });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error loading tasks");
    }
});
exports.loadTodo = loadTodo;
const addTaskTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const newTask = manager.addTask(title);
        res.status(200).json({
            message: "Task added successfully",
            task: newTask
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding task" });
    }
});
exports.addTaskTitle = addTaskTitle;
const deleteTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleted = manager.deleteTask(id);
        if (deleted) {
            res.status(200).json({
                // message: 'Task deleted successfully!',
                tasks: manager.getAllTasks() // Send updated task list
            });
        }
        else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});
exports.deleteTitle = deleteTitle;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = manager.getAllTasks();
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});
exports.getTasks = getTasks;
// Add new controller method for updating task status
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task status' });
    }
});
exports.updateTaskStatus = updateTaskStatus;
