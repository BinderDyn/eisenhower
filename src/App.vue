<template>
  <div class="flex-container">
    <div id="left-wrapper">
      <div class="main-title">
        <router-link to="/">
          <h1><i class="fa-solid fa-chart-simple"></i> Eisenhower</h1>
        </router-link>
      </div>
      <AddTask />
      <TaskList />
    </div>
    <div id="right-wrapper">
      <div class="main-layout">
        <main id="main">
          <router-view />
        </main>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Footer from "@/components/footer/Footer.vue";
import TaskList from "./components/task-list/TaskList.vue";
import AddTask from "./components/add-task/AddTask.vue";

export default defineComponent({
  components: {
    TaskList,
    Footer,
    AddTask,
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.flex-container {
  display: flex;
  gap: 0;
  height: 100%;
  overflow-y: hidden;
}

.main-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#main {
  flex-grow: 9;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

#footer-area {
  flex-grow: 1;
  display: block;
}

#left-wrapper {
  min-width: 300px;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%);
  padding-bottom: 0;
  box-shadow: 4px 0px 35px #2c3e50;
}

#right-wrapper {
  width: 100%;
}

.main-title {
  margin-top: 30px;
  border-bottom: 4px solid #ffffff;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
}

.main-title a {
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

.main-title a h1 {
  margin-bottom: 20px;
}

.main-title a.router-link-exact-active {
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
