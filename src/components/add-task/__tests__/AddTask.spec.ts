import { useTaskStore } from "@/stores/taskStore";
import { createTestingPinia } from "@pinia/testing";
import { DOMWrapper, mount } from "@vue/test-utils";
import AddTaskComponent from "../AddTask.vue";

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
