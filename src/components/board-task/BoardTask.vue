<template>
  <div
    class="task-card board-card"
    draggable="true"
    @dragstart="(ev) => setDragging(true, ev)"
    @dragend="setDragging(false)"
    :style="{
      top:
        calculateAbsoluteDistanceInRelationToScreenSize(
          copiedTask.yPosition ?? 1,
          true
        ) + 'px',
      left:
        calculateAbsoluteDistanceInRelationToScreenSize(
          copiedTask.xPosition ?? 1,
          false
        ) + 'px',
    }"
  >
    <div class="task-name-wrapper">
      <p class="task-name">{{ copiedTask.name }}</p>
    </div>
    <p class="task-priority">
      {{ copiedTask.priority }}
    </p>
  </div>
</template>

<script lang="ts">
import { TaskModel } from "@/models/Task";
import { defineComponent, PropType } from "vue";

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
        xPosition: this.task.xPosition,
        yPosition: this.task.yPosition,
      } as TaskModel,
      isDragged: false,
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
    calculateAbsoluteDistanceInRelationToScreenSize(
      relativePosition: number,
      height: boolean
    ) {
      const taskPositionZone = document.getElementById("task-position-zone");
      if (taskPositionZone != null) {
        const padding = 10;
        const calculated =
          relativePosition *
          (height
            ? taskPositionZone.getBoundingClientRect().height - padding
            : taskPositionZone.getBoundingClientRect().width - padding);
        console.log(calculated + (height ? "y" : "x"));
        return calculated;
      }
      return 0;
    },
  },
});
</script>

<style lang="css">
@import url("@/css/task.css");

.board-card {
  position: absolute;
  background-color: white;
  z-index: 99;
  width: 120px;
  margin: 0;
}
</style>
