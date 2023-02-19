<template>
  <div
    class="task-card"
    draggable="true"
    @dragstart="(ev) => setDragging(true, ev)"
    @dragend="setDragging(false)"
  >
    <div class="task-name-wrapper">
      <p v-if="!editMode" class="task-name">
        {{ copiedTask.name }}
      </p>
      <input id="task-name-edit" v-else v-model="copiedTask.name" />
    </div>
    <div v-if="!isDragged">
      <TaskEdit
        @edit="editTask()"
        @abort="abortEdit()"
        @confirm="updateTask()"
        @delete="deleteTask(task.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Priority } from "@/models/Priority.enum";
import { TaskModel } from "@/models/Task";
import { useTaskStore } from "@/stores/taskStore";
import { mapStores } from "pinia";
import { defineComponent, PropType } from "vue";
import TaskEdit from "../task-edit/TaskEdit.vue";

export default defineComponent({
  name: "TaskComponent",
  data() {
    return {
      editMode: false,
      Priority: Priority,
      copiedTask: {
        name: this.task.name,
        id: this.task.id,
        priority: this.task.priority,
      } as TaskModel,
      isDragged: false,
    };
  },
  props: {
    task: {
      type: Object as PropType<TaskModel>,
      required: true,
    },
  },
  methods: {
    setDragging(dragged: boolean, event?: DragEvent): void {
      this.isDragged = dragged;
      if (event != null && event.dataTransfer != null) {
        const taskAsString = JSON.stringify(this.copiedTask);
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("task", taskAsString);
      }
    },
    deleteTask(taskId: string) {
      if (confirm("Willst du diese Aufgabe wirklich löschen?")) {
        this.taskStore.deleteTask(taskId);
      }
    },
    editTask(): void {
      this.editMode = !this.editMode;
    },
    abortEdit(): void {
      this.editTask();
      this.copiedTask = {
        name: this.task.name,
        id: this.task.id,
        priority: this.task.priority,
      };
    },
    updateTask(): void {
      this.editTask();
      this.taskStore.updateTask(this.copiedTask);
    },
  },
  computed: {
    ...mapStores(useTaskStore),
  },
  components: { TaskEdit },
});
</script>

<style lang="css">
@import url("@/css/task.css");
</style>
