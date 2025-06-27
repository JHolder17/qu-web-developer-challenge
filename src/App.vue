<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <div>Welcome</div>
      <nav>
        <RouterLink to="/">Home</RouterLink>&nbsp;
        <RouterLink to="/favorites">Favorites</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
  <footer>Fotter</footer>
</template>

<style scoped>

</style>
