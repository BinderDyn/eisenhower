<template>
  <div>
    <input id="task-name" v-model="task.name" />
    <select id="task-priority" v-model="task.priority">
      <option :value="{Priority.A.toString()}"></option>
      <option :value="Priority.B"></option>
      <option :value="Priority.C"></option>
      <option :value="Priority.D"></option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Priority } from "@/models/Priority.enum";

export default defineComponent({
  name: "AddTaskComponent",
  data() {
    return {
      task: {
        name: "",
        priority: Priority.D,
      },
    };
  },
});
</script>

<style></style>
