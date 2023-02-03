import { DOMWrapper, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import AddTaskComponent from "../AddTask.vue";
import { useTaskStore } from "@/stores/taskStore";

test("sets task name", async () => {
  const wrapper = mount(AddTaskComponent, {
    global: {
      plugins: [createTestingPinia()],
    },
  });
  const input: DOMWrapper<HTMLInputElement> = wrapper.find("#task-name");

  await input.setValue("test");

  expect(input.element.value).toBe("test");
});

test("sets task priority", async () => {
  const wrapper = mount(AddTaskComponent);
  const input: DOMWrapper<HTMLInputElement> = wrapper.find("#task-priority");

  await input.setValue("A");

  expect(input.element.value).toBe("A");
});

test("submits on button click", async () => {
  const wrapper = mount(AddTaskComponent, {
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia()],
    },
  });
  const store = useTaskStore();
  const formButton: DOMWrapper<HTMLButtonElement> =
    wrapper.find("#submit-form-btn");

  await formButton.trigger("click");

  expect(store.addTask).toHaveBeenCalledTimes(1);
});
