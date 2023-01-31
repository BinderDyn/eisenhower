<template>
  <ul class="task-list">
    <li>Test</li>
    <li>This is an even longer test</li>
    <li>And another, even longer test than the original</li>
    <li>Test</li>
    <li>This is an even longer test</li>
    <li>And another, even longer test than the original</li>
    <li>Test</li>
    <li>This is an even longer test</li>
    <li>And another, even longer test than the original</li>
    <li>Test</li>
    <li>This is an even longer test</li>
    <li>And another, even longer test than the original</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskListComponent",
  methods: {},
});
</script>

<style lang="css">
ul.task-list {
  margin: 25px 25px;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 80vh;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

/* Extract to task component once this task is started */
ul.task-list li {
  color: #000000;
  background-color: #ffffff;
  min-height: 70px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 20px;
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 20px;
  margin-right: 10px;
}

ul.task-list li:hover {
  cursor: grab;
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
