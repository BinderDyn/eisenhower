import { DOMWrapper, mount, shallowMount } from "@vue/test-utils";
import AddTaskComponent from "../AddTask.vue";

test("sets task name", async () => {
  const wrapper = mount(AddTaskComponent);
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

// test("submits on button click", async () => {
//   const wrapper = shallowMount(AddTaskComponent);
//   const input: DOMWrapper<HTMLButtonElement> = wrapper.find("#submit-form-btn");

//   await input.element.click();


//   expect(wrapper.setProps({
//     computed: .fn()
//   })).toThrow();
// });
