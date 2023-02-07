import { TaskModel } from "@/models/Task";
import { defineStore } from "pinia";

interface ITasksState {
  tasks: TaskModel[];
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
    addTask(task: TaskModel) {
      this.tasks.push(task);
      const savedTasks = getTasks();
      savedTasks.push(task);
      setTasks(savedTasks);
    },
    deleteTask(id: string) {
      const tasks = this.tasks.length > 0 ? this.tasks.slice() : getTasks();
      const filtered = tasks.filter((t) => t.id !== id);
      setTasks(filtered);
      this.tasks = filtered;
    },
    updateTask(task: TaskModel) {
      const savedTasks = this.getAllTasks;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const toBeUpdatedTask = savedTasks.find((st) => st.id === task.id)!;
      toBeUpdatedTask.name = task.name;
      toBeUpdatedTask.priority = task.priority;
      toBeUpdatedTask.xPosition = task.xPosition;
      toBeUpdatedTask.yPosition = task.yPosition;
      setTasks(savedTasks);

      // Update state
      this.tasks = getTasks();
    },
  },
});

const getTasks = (): TaskModel[] => {
  const tasks = localStorage.getItem(localStorageKey);
  if (tasks == null || tasks == undefined) return [];
  else return JSON.parse(tasks);
};

const setTasks = (tasks: TaskModel[]): void => {
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
};
