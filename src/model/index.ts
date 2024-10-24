// model/index.ts
type ListStatus = 'pending' | 'done';

abstract class List {
    public id: number;
    public title: string;
    public status: ListStatus;
    constructor(id: number, title: string, status: ListStatus) {
        this.id = id;
        this.title = title;
        this.status = status;
    }
}

export class Task extends List {}

export class TaskManager {
    private tasks: List[] = [];
    private nextId: number = 1;

    addTask(title: string): List {
        const task = new Task(this.nextId++, title, 'pending');
        this.tasks.push(task);
        return task;
    }

    getAllTasks(): List[] {
        return this.tasks;
    }

    getTaskById(id: number) {
        return this.tasks.find((item: List) => item.id === id);
    }

    editTask(id: number, title: string): void {
        const task = this.getTaskById(id);
        if (task) {
            task.title = title;
        }
    }

    completeTask(id: number) {
        const task = this.getTaskById(id);
        if (task) {
            task.status = task.status === 'done' ? 'pending' : 'done';
        }
        return task;
    }

    deleteTask(id: number): boolean {
        const index = this.tasks.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}