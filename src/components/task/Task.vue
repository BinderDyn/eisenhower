<template>
  <div class="task-card">
    <div class="task-name-wrapper">
      <p class="task-name">
        {{ task.name }}
      </p>
    </div>
    <div class="task-priority">
      {{ task.priority }}
    </div>
    <button class="delete-button" @click="deleteTask(task.id)">
      <i class="fa fa-trash"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Task } from "@/models/Task";

export default defineComponent({
  name: "TaskComponent",
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  methods: {
    deleteTask(taskId: string) {
      if (confirm("Do you really want to delete this task?")) {
      }
    },
  },
});
</script>

<style lang="css">
.task-card {
  color: #000000;
  background-color: #ffffff;
  min-height: 40px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 20px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-card:hover {
  cursor: grab;
}

.delete-button {
  position: relative;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(180, 0, 0);
  color: #ffffff;
  right: -20px;
  bottom: -20px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: rgb(112, 0, 0);
}

.task-name-wrapper {
  flex-grow: 8;
}

.task-name {
  text-overflow: ellipsis;
}

.task-priority {
  flex-grow: 2;
}
</style>