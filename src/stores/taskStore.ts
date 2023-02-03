import { Task } from "@/models/Task";
import { defineStore } from "pinia";

interface ITasksState {
  tasks: Task[];
}

const taskStoreKey = "task";

export const useTaskStore = defineStore(taskStoreKey, {
  state: (): ITasksState => ({ tasks: [] }),
  getters: {
    getAllTasks(state: ITasksState) {
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
    },
  },
});
