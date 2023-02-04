<template>
  <footer>
    <nav>
      <a href="https://github.com/BinderDyn/eisenhower" target="_blank"
        ><i class="fa-brands fa-github"></i
      ></a>
      |
      <router-link to="/legal-and-privacy">
        <i class="fa-solid fa-section"></i> Legal and Privacy
      </router-link>
    </nav>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style scoped>
footer {
  height: 100px;
  bottom: 0;
  margin-bottom: 0;
  padding-top: 20px;
}

nav {
  height: 100%;
}
</style>
