import { Priority } from "@/models/Priority.enum";
import { useTaskStore } from "@/stores/taskStore";
import { createTestingPinia } from "@pinia/testing";
import { DOMWrapper, mount } from "@vue/test-utils";
import Task from "../Task.vue";
declare var global: any;

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
