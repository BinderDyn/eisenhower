import { Priority } from "@/models/Priority.enum";
import { useTaskStore } from "@/stores/taskStore";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import TaskListVue from "../TaskList.vue";

test("renders task list", async () => {
  const wrapper = mount(TaskListVue, {
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia()],
    },
  });
  const store = useTaskStore();

  const taskListComponent = wrapper.find(".task-list");

  expect(taskListComponent.exists()).toBeTruthy();
});

// TODO: Make this test working
// test("renders task components", async () => {
//   const store = useTaskStore();
//   store.tasks = [
//     { id: "someId", name: "some task", priority: Priority.A },
//     { id: "someOtherId", name: "someOtherTask", priority: Priority.B },
//   ];
//   const wrapper = mount(TaskListVue, {
//     attachTo: document.body,
//     global: {
//       plugins: [createTestingPinia()],
//     },
//   });

//   const taskComponent = wrapper.findAll(".task-card");

//   expect(taskComponent.length).toBe(2);
// });
