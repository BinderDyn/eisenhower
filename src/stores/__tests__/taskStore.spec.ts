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

  it("gets tasks if availlable", () => {
    const store = useTaskStore();
    store.tasks = [{ id: "abc", name: "test", priority: Priority.A }];

    const tasks = store.getAllTasks;

    expect(tasks.length).toBe(1);
  });

  it("adds a tasks", () => {
    const store = useTaskStore();

    store.addTask({ id: "id", name: "task", priority: Priority.A });

    expect(store.tasks.length).toBe(1);
    expect(store.tasks[0]).toStrictEqual({
      id: "id",
      name: "task",
      priority: Priority.A,
    });
  });

  it("deletes a task", () => {
    const store = useTaskStore();
    store.tasks = [
      { id: "id", name: "name", priority: Priority.A },
      { id: "id2", name: "name", priority: Priority.A },
    ];

    store.deleteTask("id");

    expect(store.tasks.length).toBe(1);
    expect(store.tasks[0].id).toBe("id2");
  });
});
