<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark">
      <a href="/" class="navbar-brand">Animal Crossing Community</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/questions" class="nav-link">FAQ</a>
        </li>

        <li class="nav-item">
          <a href="/add" class="nav-link">Add Questions</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style scoped>
.navbar {
  background-color: rgb(211, 145, 92);
  overflow: hidden;
}
.navbar-brand {
  font-size: 2.5vw;
}
.nav-link {
  font-size: 2.5vw;
}
</style>
