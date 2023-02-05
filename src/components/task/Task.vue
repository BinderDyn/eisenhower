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
    <div class="btn-group">
      <button class="edit-button" @click="editTask()">
        <i class="fa fa-pen"></i>
      </button>
      <button class="delete-button" @click="deleteTask(task.id)">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Task } from "@/models/Task";
import { useTaskStore } from "@/stores/taskStore";
import { mapStores } from "pinia";
import { defineComponent, PropType } from "vue";

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
        this.taskStore.deleteTask(taskId);
      }
    },
    editTask(): void {
      console.log("edit");
    },
  },
  computed: {
    ...mapStores(useTaskStore),
  },
});
</script>

<style lang="css">
.task-card {
  color: #000000;
  background-color: #ffffff;
  min-height: 55px;
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
  position: relative;
}

.task-card:hover {
  cursor: grab;
}

.btn-group {
  position: absolute;
  display: flex;
  gap: 10px;
  right: 0;
  bottom: -15px;
}

.delete-button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(180, 0, 0);
  color: #ffffff;
  right: -20px;
  bottom: -40px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: rgb(112, 0, 0);
}

.edit-button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(255, 153, 0);
  color: #ffffff;
  right: -20px;
  top: -38px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: rgb(186, 112, 0);
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
