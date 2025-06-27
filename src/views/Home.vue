<template>
  <main>
    <h1>A Joke</h1>
    <Card style="width: 25rem;">
      <template #title>
        {{ currentJoke.setup }}
      </template>
      <template #content v-if="showCurrentJokePunchline">
        {{ currentJoke.punchline }}
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button label="Reveal Answer" class="w-full" @click="showCurrentJokePunchline = true" />
          <Button label="New Joke" outlined class="w-full" @click="getJoke"/>
        </div>
      </template>
    </Card>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRandomJoke } from '@/api/jokes.js';
import Card from 'primevue/card';
import Button from 'primevue/button';

const currentJoke = ref({});
const currentJokeLoading = ref(true);
const showCurrentJokePunchline = ref(false)

const getJoke = async () => {
  showCurrentJokePunchline.value = false;
  try {
    currentJoke.value = await getRandomJoke();
  } catch (err) {
    console.error('Failed to fetch jokes:', err);
  } finally {
    currentJokeLoading.value = false;
  }
}

onMounted(() => {
  getJoke();
});
</script>


<style scoped></style>
