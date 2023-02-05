import { Priority } from "@/models/Priority.enum";
import { useTaskStore } from "@/stores/taskStore";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import Task from "../Task.vue";
declare let global: any;

beforeAll(() => {
  global.confirm = jest.fn(() => true);
});

test("deletes task if confirmed", async () => {
  const wrapper = mount(Task, {
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      task: { id: "id", name: "name", priority: Priority.A },
    },
  });
  const store = useTaskStore();

  const button = await wrapper.find(".delete-button");
  await button.trigger("click");
  await wrapper.vm.$nextTick();

  expect(store.deleteTask).toHaveBeenCalledTimes(1);
});

test("does nothing if not confirmed", async () => {
  global.confirm = jest.fn(() => false);
  const wrapper = mount(Task, {
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      task: { id: "id", name: "name", priority: Priority.A },
    },
  });
  const store = useTaskStore();

  const button = await wrapper.find(".delete-button");
  await button.trigger("click");
  await wrapper.vm.$nextTick();

  expect(store.deleteTask).toHaveBeenCalledTimes(0);
});

test("there is an edit button visible", async () => {
  const wrapper = mount(Task, {
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      task: { id: "id", name: "name", priority: Priority.A },
    },
  });

  const button = wrapper.find(".edit-button");

  expect(button.exists()).toBeTruthy();
});

test("is in edit mode after click on edit button", async () => {
  const wrapper = mount(Task, {
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia()],
    },
    props: {
      task: { id: "id", name: "name", priority: Priority.A },
    },
  });

  const editButton = wrapper.find(".edit-button");
  await editButton.trigger("click");
  await wrapper.vm.$nextTick();
  const taskNameEdit = wrapper.find("#task-name-edit");
  const taskPriorityEdit = wrapper.find("#task-priority-edit");
  const confirmButton = wrapper.find(".confirm-button");
  const abortButton = wrapper.find(".abort-button");

  expect(taskNameEdit.exists()).toBeTruthy();
  expect(taskPriorityEdit.exists()).toBeTruthy();
  expect(confirmButton.exists()).toBeTruthy();
  expect(abortButton.exists()).toBeTruthy();
});
