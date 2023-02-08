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
      <input id="task-name-edit" v-if="editMode" v-model="copiedTask.name" />
    </div>
    <p v-if="!editMode" class="task-priority">
      {{ copiedTask.priority }}
    </p>
    <select
      id="task-priority-edit"
      v-if="editMode"
      v-model="copiedTask.priority"
    >
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
    <div v-if="!isDragged" class="btn-group">
      <template v-if="editMode">
        <button class="confirm-button" @click="updateTask()">
          <i class="fa fa-check"></i>
        </button>
        <button class="abort-button" @click="abortEdit()">
          <i class="fa fa-xmark"></i>
        </button>
      </template>
      <template v-else>
        <button class="edit-button" @click="editTask()">
          <i class="fa fa-pen"></i>
        </button>
        <button class="delete-button" @click="deleteTask(task.id)">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Priority } from "@/models/Priority.enum";
import { TaskModel } from "@/models/Task";
import { useTaskStore } from "@/stores/taskStore";
import { mapStores } from "pinia";
import { defineComponent, PropType } from "vue";

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
        xPosition: this.task.xPosition,
        yPosition: this.task.yPosition,
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
    deleteTask(taskId: string) {
      if (confirm("Do you really want to delete this task?")) {
        this.taskStore.deleteTask(taskId);
      }
    },
    editTask(): void {
      this.editMode = !this.editMode;
    },
    abortEdit(): void {
      this.copiedTask = {
        name: this.task.name,
        id: this.task.id,
        priority: this.task.priority,
        xPosition: this.task.xPosition,
        yPosition: this.task.yPosition,
      };
      this.editTask();
    },
    updateTask(): void {
      this.editTask();
      this.taskStore.updateTask(this.copiedTask);
    },
    setDragging(dragged: boolean, event?: DragEvent): void {
      this.isDragged = dragged;

      if (event != null && event.dataTransfer != null) {
        const taskAsString = JSON.stringify(this.copiedTask);
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("task", taskAsString);
      }
    },
  },
  computed: {
    ...mapStores(useTaskStore),
  },
});
</script>

<style lang="css">
@import url("@/css/task.css");
</style>
