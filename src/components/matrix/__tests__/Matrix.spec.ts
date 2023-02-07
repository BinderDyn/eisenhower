import { createTestingPinia } from "@pinia/testing";
import { DOMWrapper, mount } from "@vue/test-utils";
import Matrix from "../Matrix.vue";

test("renders four areas for each priority", () => {
  const wrapper = mount(Matrix, {
    global: {
      plugins: [createTestingPinia()]
    }
  });

  const areas = wrapper.findAll(".priority-area");

  expect(areas.length).toBe(4);
});
