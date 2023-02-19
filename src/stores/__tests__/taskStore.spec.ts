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

  it("gets only tasks with no priority if availlable", () => {
    const store = useTaskStore();
    store.tasks = [
      { id: "abc", name: "test", priority: Priority.A },
      { id: "abc", name: "test", priority: undefined },
    ];

    const tasks = store.getWithoutPriority;

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

  it("updates a task", () => {
    const store = useTaskStore();
    store.tasks = [
      { id: "id", name: "name", priority: Priority.A },
      { id: "id2", name: "name", priority: Priority.A },
    ];

    store.updateTask({ id: "id", name: "nam123", priority: Priority.C });

    expect(store.tasks[0].id).toBe("id");
    expect(store.tasks[0].name).toBe("nam123");
    expect(store.tasks[0].priority).toBe(Priority.C);
  });

  it("gets tasks for specific priority", () => {
    const store = useTaskStore();
    store.tasks = [
      { id: "id", name: "name", priority: Priority.A },
      { id: "id2", name: "name", priority: Priority.B },
    ];

    const tasks = store.getTasksForPriority(Priority.B);

    expect(tasks.length).toBe(1);
  });
});
