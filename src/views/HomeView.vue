<template>
  <div class="matrix-wrapper">
    <Matrix />
  </div>
</template>

<script lang="ts">
import Matrix from "@/components/matrix/Matrix.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Matrix,
  },
});
</script>

<style lang="css">
.matrix-wrapper {
  display: block;
  height: 100%;
  margin: 0 20px;
}
</style>
