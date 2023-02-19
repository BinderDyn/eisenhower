<template>
  <div class="task-list">
    <Task
      v-for="task in taskStore.getWithoutPriority"
      :key="task.name"
      :task="task"
    />
  </div>
</template>

<script lang="ts">
import Task from "@/components/task/Task.vue";
import { useTaskStore } from "@/stores/taskStore";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskListComponent",
  components: {
    Task,
  },
  methods: {},
  computed: {
    ...mapStores(useTaskStore),
  },
});
</script>

<style lang="css">
.task-list {
  margin: 25px 25px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 62vh;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 10);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ffffff;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b1b1b1;
}
</style>
