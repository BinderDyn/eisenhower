<template>
  <div class="flex-container">
    <div id="left-wrapper">
      <div class="main-title">
        <router-link to="/">
          <h1><i class="fa-solid fa-chart-simple"></i> Eisenhower</h1>
        </router-link>
      </div>
    </div>
    <div id="right-wrapper">
      <router-view />
    </div>
  </div>
</template>

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
}

.main-title a {
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
}

.main-title a h1 {
  margin-bottom: 20px;
}

.main-title a {
  border-bottom: 2px solid #ffffff;
}

.main-title a.router-link-exact-active {
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
