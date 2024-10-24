"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
class TaskManager {
    constructor() {
        this.listContainer = document.getElementById('list-container');
        this.inputBox = document.getElementById('input-box');
        this.tasks = [];
        this.loadData();
        this.renderTasks();
    }
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = "flex items-center cursor-pointer justify-between";
        li.dataset.id = task.id;
        // Create task span
        const taskSpan = document.createElement('span');
        taskSpan.className = "flex-grow";
        const checkboxSpan = document.createElement('span');
        checkboxSpan.className = `w-5 h-5 inline-block mr-2 ${task.isCompleted ? 'checked' : 'unchecked'}`;
        const textSpan = document.createTextNode(task.text);
        taskSpan.appendChild(checkboxSpan);
        taskSpan.appendChild(textSpan);
        if (task.isCompleted) {
            taskSpan.style.textDecoration = 'line-through';
        }
        // Add toggle functionality
        taskSpan.onclick = () => this.toggleTask(task.id);
        // Create delete button
        const deleteSpan = document.createElement('span');
        deleteSpan.innerHTML = '\u00d7';
        deleteSpan.className = 'relative text-red-300 text-lg ml-4 cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-red-100 hover:text-red-500';
        deleteSpan.onclick = () => this.removeTask(task.id);
        li.appendChild(taskSpan);
        li.appendChild(deleteSpan);
        return li;
    }
    addTask(text) {
        if (!text.trim()) {
            this.showError("You must add something...!");
            return;
        }
        const newTask = {
            id: crypto.randomUUID(),
            text: text.trim(),
            isCompleted: false
        };
        this.tasks.push(newTask);
        this.renderTasks();
        this.saveData();
        this.inputBox.value = '';
    }
    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks();
        this.saveData();
    }
    toggleTask(id) {
        this.tasks = this.tasks.map(task => task.id === id
            ? Object.assign(Object.assign({}, task), { isCompleted: !task.isCompleted }) : task);
        this.renderTasks();
        this.saveData();
    }
    renderTasks() {
        this.listContainer.innerHTML = '';
        this.tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.listContainer.appendChild(taskElement);
        });
    }
    saveData() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }
    loadData() {
        const savedData = localStorage.getItem('todoTasks');
        if (savedData) {
            this.tasks = JSON.parse(savedData);
        }
    }
    showError(message) {
        // Using the SweetAlert type definition
        window.swal({
            title: "Error!",
            text: message,
            icon: "error",
            button: "Okay",
        });
    }
}
exports.TaskManager = TaskManager;
// Move the initialization into a function
function initializeApp() {
    const taskManager = new TaskManager();
    // Add task button event listener
    const addButton = document.querySelector('button');
    addButton.onclick = () => {
        const inputBox = document.getElementById('input-box');
        taskManager.addTask(inputBox.value);
    };
    // Add keyboard event listener for input
    const inputBox = document.getElementById('input-box');
    inputBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            taskManager.addTask(inputBox.value);
        }
    });
}
// Call the initialization function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
