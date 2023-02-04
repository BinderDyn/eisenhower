import { Priority } from "@/models/Priority.enum";
import { createPinia, setActivePinia } from "pinia";
import { useTaskStore } from "../taskStore";

describe("Task Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("gets all tasks", () => {
    const store = useTaskStore();

    const tasks = store.getAllTasks;

    expect(tasks.length).toBe(0);
  });

  it("adds a tasks", () => {
    const store = useTaskStore();

    store.addTask({ name: "task", priority: Priority.A });

    expect(store.tasks.length).toBe(1);
    expect(store.tasks[0]).toStrictEqual({
      name: "task",
      priority: Priority.A,
    });
  });
});
