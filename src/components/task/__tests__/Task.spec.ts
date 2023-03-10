import { Priority } from "@/models/Priority.enum";
import { useTaskStore } from "@/stores/taskStore";
import { createTestingPinia } from "@pinia/testing";
import { DOMWrapper, mount } from "@vue/test-utils";
import Task from "../Task.vue";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    data() {
      return {
        isDragged: false,
        editMode: false,
      };
    },
  });

  const editButton = wrapper.find(".edit-button");
  await editButton.trigger("click");
  await wrapper.vm.$nextTick();
  const taskNameEdit = wrapper.find("#task-name-edit");
  const confirmButton = wrapper.find(".confirm-button");
  const abortButton = wrapper.find(".abort-button");

  expect(taskNameEdit.exists()).toBeTruthy();
  expect(confirmButton.exists()).toBeTruthy();
  expect(abortButton.exists()).toBeTruthy();
});

test("updates task on confirm", async () => {
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
  const editButton = wrapper.find(".edit-button");
  await editButton.trigger("click");
  await wrapper.vm.$nextTick();
  const taskNameEdit: DOMWrapper<HTMLInputElement> =
    wrapper.find("#task-name-edit");

  await taskNameEdit.setValue("test");

  const confirmButton = wrapper.find(".confirm-button");
  await confirmButton.trigger("click");
  await wrapper.vm.$nextTick();
  const deleteButton = wrapper.find(".delete-button");

  expect(editButton.exists()).toBeTruthy();
  expect(deleteButton.exists()).toBeTruthy();
  expect(store.updateTask).toHaveBeenCalledTimes(1);
  expect(store.updateTask).toHaveBeenCalledWith({
    id: "id",
    name: "test",
    priority: "A",
  });
});

test("does nothing on update abort and resets", async () => {
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
  const editButton = wrapper.find(".edit-button");
  await editButton.trigger("click");
  await wrapper.vm.$nextTick();

  const taskNameEdit: DOMWrapper<HTMLInputElement> =
    wrapper.find("#task-name-edit");
  const abortButton = wrapper.find(".abort-button");

  await taskNameEdit.setValue("test");
  await abortButton.trigger("click");
  await wrapper.vm.$nextTick();
  const taskName: DOMWrapper<HTMLParagraphElement> = wrapper.find(".task-name");

  expect(editButton.exists()).toBeTruthy();
  expect(taskName.element.textContent).toBe("name");
  expect(store.updateTask).toHaveBeenCalledTimes(0);
});
