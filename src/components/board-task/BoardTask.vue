<template>
  <div
    class="task-card board-card"
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
import { TaskModel } from "@/models/Task";
import { useTaskStore } from "@/stores/taskStore";
import { mapStores } from "pinia";
import { defineComponent, PropType } from "vue";
import TaskEdit from "../task-edit/TaskEdit.vue";

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<TaskModel>,
      required: true,
    },
  },
  data() {
    return {
      copiedTask: {
        name: this.task.name,
        id: this.task.id,
        priority: this.task.priority,
      } as TaskModel,
      isDragged: false,
      editMode: false,
    };
  },
  methods: {
    setDragging(dragging: boolean, ev?: DragEvent): void {
      this.isDragged = dragging;
      if (ev != null && ev.dataTransfer != null) {
        ev.dataTransfer.dropEffect = "move";
        ev.dataTransfer.effectAllowed = "move";
        ev.dataTransfer.setData("task", JSON.stringify(this.copiedTask));
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
      this.copiedTask = {
        name: this.task.name,
        id: this.task.id,
        priority: this.task.priority,
      };
      this.editTask();
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

.board-card {
  height: 50px;
  background-color: white;
  z-index: 99;
  width: 120px;
  margin: 5px;
  min-width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#task-name-edit {
  width: 80%;
}
</style>
