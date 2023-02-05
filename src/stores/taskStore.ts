import { Task } from "@/models/Task";
import { defineStore } from "pinia";

interface ITasksState {
  tasks: Task[];
}

const taskStoreKey = "task";
const localStorageKey = "tasks";

export const useTaskStore = defineStore(taskStoreKey, {
  state: (): ITasksState => ({ tasks: [] }),
  getters: {
    getAllTasks(state: ITasksState) {
      const tasks = state.tasks.length > 0 ? state.tasks.slice() : getTasks();
      return tasks.sort((a, b) => {
        if (a.priority > b.priority) return 1;
        if (a.priority < b.priority) return -1;
        return 0;
      });
    },
  },
  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
      const savedTasks = getTasks();
      savedTasks.push(task);
      setTasks(savedTasks);
    },
    deleteTask(id: string) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      setTasks(this.tasks);
    },
    updateTask(task: Task) {
      const savedTasks = this.getAllTasks;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const toBeUpdatedTask = savedTasks.find((st) => st.id === task.id)!;
      toBeUpdatedTask.name = task.name;
      toBeUpdatedTask.priority = task.priority;
      setTasks(savedTasks);

      // Update state
      this.tasks = getTasks();
    },
  },
});

const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(localStorageKey);
  if (tasks == null || tasks == undefined) return [];
  else return JSON.parse(tasks);
};

const setTasks = (tasks: Task[]): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
};
