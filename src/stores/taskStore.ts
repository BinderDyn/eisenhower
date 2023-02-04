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
      state.tasks = getItems();
      return state.tasks.slice().sort((a, b) => {
        if (a.priority > b.priority) return 1;
        if (a.priority < b.priority) return -1;
        return 0;
      });
    },
  },
  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
      const savedTasks = getItems();
      savedTasks.push(task);
      setTasks(savedTasks);
    },
  },
});

const getItems = (): Task[] => {
  const tasks = localStorage.getItem(localStorageKey);
  if (tasks == null || tasks == undefined) return [];
  else return JSON.parse(tasks);
};

const setTasks = (tasks: Task[]): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
};
