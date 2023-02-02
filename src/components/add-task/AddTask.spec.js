import { mount } from '@vue/test-utils';
import AddTaskComponent from './AddTask.vue';

test('sets task name', async () => {
    const wrapper = mount(AddTaskComponent);
    const input = wrapper.find('task-name');

    await input.setValue('test');

    expect(input.element.value).toBe('test');
});