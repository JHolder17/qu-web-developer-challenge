<template>
  <Menubar :model="menuItems">
    <template #start>
      Welcome
    </template>
  </Menubar>
  <RouterView />
  <footer>&copy; Joseph Holder {{ new Date().getFullYear() }}</footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';
import { ref } from 'vue';

const router = useRouter();
const menuItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/');
    }
  },
  {
    label: 'Favorites',
    icon: 'pi pi-star',
    command: () => {
      router.push('/favorites');
    }
  }
]);
</script>

<style scoped>
.p-menubar {
  top: 0;
  left: 0;
  width: 100%;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  text-align: center;
}
</style>
