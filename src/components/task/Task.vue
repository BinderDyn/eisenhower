<template>
  <div class="task-card">
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
    <div class="btn-group">
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
import { Task } from "@/models/Task";
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
      } as Task,
    };
  },
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

.abort-button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(180, 0, 0);
  color: #ffffff;
  right: -20px;
  bottom: -40px;
  cursor: pointer;
}

.delete-button:hover,
.abort-button:hover {
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

.confirm-button {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: rgb(0, 255, 26);
  color: #ffffff;
  right: -20px;
  top: -38px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: rgb(1, 177, 18);
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

#task-name-edit {
  outline: 2px solid rgb(255, 76, 22);
  text-align: center;
  font-size: 1rem;
  width: 80%;
}
</style>
