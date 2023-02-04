import { DOMWrapper, mount } from "@vue/test-utils";
import Matrix from "../Matrix.vue";

test("renders four areas for each priority", () => {
  const wrapper = mount(Matrix);

  const areas = wrapper.findAll(".priority-area");

  expect(areas.length).toBe(4);
});
