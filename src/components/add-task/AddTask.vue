<template>
  <div class="wrapper">
    <form id="add-task-form" @on-submit="(e: SubmitEvent) => addTask(e, task)">
      <div class="flex">
        <input type="text" id="task-name" v-model="task.name" />
        <select id="task-priority" v-model="task.priority">
          <option
            v-for="prio in Object.keys(Priority).filter((item) =>
              isNaN(Number(item))
            )"
            :key="prio"
          >
            {{ prio }}
          </option>
        </select>
      </div>
      <button type="submit">Add task</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Priority } from "@/models/Priority.enum";
import { Task } from "@/models/Task";

export default defineComponent({
  name: "AddTaskComponent",
  methods: {
    addTask(ev: SubmitEvent, task: Task): void {
      ev.preventDefault();
      console.log(task);
    },
  },
  data() {
    return {
      task: {
        name: "",
        priority: Priority.D,
      } as Task,
      Priority: Priority,
    };
  },
});
</script>

<style lang="css">
.flex {
  display: flex;
  align-items: center;
  justify-content: start;
}

input {
  flex-grow: 8;
  height: 25px;
  margin-right: 10px;
  padding: 5px;
}

select {
  flex-grow: 2;
  width: 50px;
  height: 35px;
  font-size: 0.9rem;
}

button {
  padding: 10px;
  margin: 15px 0px;
  border-radius: 15px;
  width: 100%;
  background-color: rgb(0, 0, 156);
  color: white;
  text-transform: uppercase;
  font-weight: 800;
}

.button:focus {
  background-color: rgb(0, 0, 113);
}

.wrapper {
  margin: 10px 25px;
}
</style>
