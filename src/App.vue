<template>
  <div class="min-h-screen flex flex-col">
    <Menubar :model="menuItems">
      <template #start>
        Welcome to the Laugh Factory!
      </template>
    </Menubar>
    <main class="flex-1">
      <RouterView />
    </main>
    <footer class="w-full mb-4 h-4 flex items-center justify-center">&copy; Joseph Holder {{ new Date().getFullYear() }}</footer>
  </div>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';

const router = useRouter();
const menuItems = [
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
  },
  {
    label: 'Source Code',
    icon: 'pi pi-github',
    command: () => {
      window.open('https://github.com/JHolder17/qu-web-developer-challenge', '_blank');;
    }
  }
];
</script>

<style scoped>
.p-menubar {
  justify-content: space-between;
  padding-left: 2rem;
  border: none;
  border-radius: none;
  border-bottom: 1px solid var(--p-menubar-border-color);
}
</style>
