<template>
  <div class="wrapper">
    <form id="add-task-form" @submit.prevent="addTask()">
      <div class="flex">
        <input type="text" id="task-name" required="true" v-model="task.name" />
        <select id="task-priority" v-model="task.priority">
          <option
            v-for="prio in Object.keys(Priority).filter((item) =>
              isNaN(Number(item))
            )"
            :key="prio"
            :value="prio"
            :selected="prio === 'D'"
          >
            {{ prio }}
          </option>
        </select>
      </div>
      <input id="submit-form-btn" type="submit" value="Add task" />
    </form>
  </div>
</template>

<script lang="ts">
import { Priority } from "@/models/Priority.enum";
import { Task } from "@/models/Task";
import { useTaskStore } from "@/stores/taskStore";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddTaskComponent",
  methods: {
    addTask(): void {
      this.taskStore.addTask({
        name: this.task.name,
        priority: this.task.priority,
      });
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
  computed: {
    ...mapStores(useTaskStore),
  },
});
</script>

<style lang="css">
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

input[type="submit"] {
  cursor: pointer;
  height: 40px;
  width: 120px;
  margin: 15px 0px;
  border-radius: 15px;
  background-color: rgb(0, 0, 156);
  color: white;
  text-transform: uppercase;
  font-weight: 800;
}

input[type="submit"]:hover {
  background-color: darkblue;
}

input[type="submit"]:hover {
  background-color: darkblue;
}

.wrapper {
  margin: 10px 25px;
}
</style>
