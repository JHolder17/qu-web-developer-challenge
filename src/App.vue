<template>
  <div>
    <Menubar :model="menuItems">
      <template #start>
        Welcome to the Laugh Factory!
      </template>
    </Menubar>
    <main>
      <RouterView />
    </main>
    <!-- <footer>&copy; Joseph Holder {{ new Date().getFullYear() }}</footer> -->
  </div>

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
  justify-content: space-between;
  border: none;
  border-radius: none;
  border-bottom: 1px solid var(--p-menubar-border-color);
}

footer {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
}
</style>
