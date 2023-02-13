<template>
  <div class="priority-area-wrapper">
    <div
      class="priority-area b"
      style="border-top-left-radius: 25px"
      @drop.prevent="(event) => onDrop(event)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="task-zone" id="b-area">
        <BoardTask
          v-for="task in taskStore.getAllTasks.filter(
            (t) => t.priority == Priority.B
          )"
          :key="task.id"
          :task="task"
        />
      </div>
      <p class="priority-letter">B</p>
      <div class="priority-legend">Important but not urgent</div>
    </div>
    <div
      class="priority-area a"
      style="border-top-right-radius: 25px"
      @drop.prevent="(event) => onDrop(event)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="task-zone" id="a-area">
        <BoardTask
          v-for="task in taskStore.getAllTasks.filter(
            (t) => t.priority == Priority.A
          )"
          :key="task.id"
          :task="task"
        />
      </div>
      <p class="priority-letter">A</p>
      <div class="priority-legend">Important and urgent</div>
    </div>
  </div>
  <div class="priority-area-wrapper">
    <div
      class="priority-area d"
      style="border-bottom-left-radius: 25px"
      @drop.prevent="(event) => onDrop(event)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="task-zone" id="d-area">
        <BoardTask
          v-for="task in taskStore.getAllTasks.filter(
            (t) => t.priority == Priority.D
          )"
          :key="task.id"
          :task="task"
        />
      </div>

      <p class="priority-letter">D</p>
      <div class="priority-legend">Not important and not urgent</div>
    </div>
    <div
      class="priority-area c"
      @drop.prevent="(event) => onDrop(event)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="task-zone" id="c-area">
        <BoardTask
          v-for="task in taskStore.getAllTasks.filter(
            (t) => t.priority == Priority.C
          )"
          :key="task.id"
          :task="task"
        />
      </div>
      <p class="priority-letter">C</p>
      <div class="priority-legend">Not important but urgent</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Priority } from "@/models/Priority.enum";
import { TaskModel } from "@/models/Task";
import { mapStores } from "pinia";
import { defineComponent } from "vue";
import { useTaskStore } from "../../stores/taskStore";
import BoardTask from "../board-task/BoardTask.vue";

export default defineComponent({
  name: "MatrixComponent",
  data() {
    return {
      Priority: Priority,
    };
  },
  methods: {
    onDrop(payload: DragEvent) {
      if (payload.dataTransfer != null) {
        const data = payload.dataTransfer.getData("task");
        if (data != null) {
          const task = JSON.parse(data) as TaskModel;
          const taskDropZone = (payload.target as HTMLElement).closest("div");

          if (!taskDropZone?.id.includes("area")) return;

          if (taskDropZone != null) {
            const dropZoneId = taskDropZone.id;

            const priorityDict: { [name: string]: Priority } = {
              A: Priority.A,
              B: Priority.B,
              C: Priority.C,
              D: Priority.D,
            };

            task.priority = priorityDict[dropZoneId.toUpperCase()[0]];
            this.taskStore.updateTask(task);
          }
        }
      }
    },
  },
  computed: {
    ...mapStores(useTaskStore),
  },
  components: { BoardTask },
});
</script>

<style lang="css">
.priority-area-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 50%;
}

.priority-area-wrapper:last-child {
  margin-bottom: 20px;
}

.priority-area {
  flex-grow: 5;
  height: 100%;
  text-align: right;
  position: relative;
  z-index: 99;
}

.task-zone {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  flex-wrap: wrap;
  gap: 10px;
}

.priority-letter {
  margin-right: 20px;
  margin-top: 20px;
  font-size: 5rem;
  font-weight: bold;
}

.priority-legend {
  font-size: 1.2rem;
  bottom: 10px;
  left: 10px;
  position: absolute;
  width: fit-content;
  font-weight: 600;
  padding: 0 10px;
  line-height: 1.3rem;
}

.priority-area.d {
  background-color: rgba(242, 255, 126, 0.158);
}

.priority-area.d > .priority-letter,
.priority-area.d > .priority-legend {
  color: rgba(255, 166, 2, 0.589);
}

.priority-area.c {
  background-color: rgba(137, 255, 126, 0.158);
}

.priority-area.c > .priority-letter,
.priority-area.c > .priority-legend {
  color: rgba(21, 255, 0, 0.589);
}

.priority-area.b {
  background-color: rgba(126, 214, 255, 0.158);
}

.priority-area.b > .priority-letter,
.priority-area.b > .priority-legend {
  color: rgba(0, 174, 255, 0.589);
}

.priority-area.a {
  background-color: rgba(255, 106, 106, 0.158);
}

.priority-area.a > .priority-letter,
.priority-area.a > .priority-legend {
  color: rgba(255, 0, 0, 0.589);
}
</style>
