<template>
  <div class="priority-area-wrapper">
    <div class="priority-area b" style="border-top-left-radius: 25px">
      <p class="priority-letter">B</p>
    </div>
    <div class="priority-area a" style="border-top-right-radius: 25px">
      <p class="priority-letter">A</p>
    </div>
  </div>
  <div class="priority-area-wrapper">
    <div class="priority-area d" style="border-bottom-left-radius: 25px">
      <p class="priority-letter">D</p>
    </div>
    <div class="priority-area c" style="border-bottom-right-radius: 25px">
      <p class="priority-letter">C</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MatrixComponent",
});
</script>
<style lang="css">
.priority-area-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.priority-area-wrapper:last-child {
  margin-bottom: 20px;
}

.priority-area {
  flex-grow: 1;
  height: 100%;
  text-align: right;
}

.priority-letter {
  margin-right: 20px;
  margin-top: 20px;
  font-size: 5rem;
  font-weight: bold;
}

.priority-area.d {
  background-color: rgba(242, 255, 126, 0.158);
}

.priority-area.d > .priority-letter {
  color: rgba(255, 166, 2, 0.589);
}

.priority-area.c {
  background-color: rgba(137, 255, 126, 0.158);
}

.priority-area.c > .priority-letter {
  color: rgba(21, 255, 0, 0.589);
}

.priority-area.b {
  background-color: rgba(126, 214, 255, 0.158);
}

.priority-area.b > .priority-letter {
  color: rgba(0, 174, 255, 0.589);
}

.priority-area.a {
  background-color: rgba(255, 106, 106, 0.158);
}

.priority-area.a > .priority-letter {
  color: rgba(255, 0, 0, 0.589);
}
</style>
