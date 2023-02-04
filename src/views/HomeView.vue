<template>
  <div class="matrix-wrapper">
    <Matrix />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Matrix from "@/components/matrix/Matrix.vue";

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
  height: 50%;
  margin: 0 20px;
}
</style>
