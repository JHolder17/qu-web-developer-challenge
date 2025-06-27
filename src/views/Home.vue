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
          <Button label="New Joke" outlined class="w-full" @click="getJoke" />
        </div>
      </template>
    </Card>
    <DataTable :value="jokesTableData" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-content-between gap-2">
          <span class="text-xl font-bold">Top 100 Jokes</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
      </template>
      <Column field="type" header="Category"></Column>
      <Column field="setup" header="Setup"></Column>
      <Column field="punchline" header="Puncline"></Column>
      <Column field="rating" header="Reviews">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating"
            @update:modelValue="(value) => handleJokeRatingClick(value, slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRandomJoke, getOneHundredJokes } from '@/api/jokes.js';
import Card from 'primevue/card';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Rating from 'primevue/rating';

// Random Joke Card Logic
const currentJoke = ref({});
const currentJokeLoading = ref(true);
const showCurrentJokePunchline = ref(false)
const getJoke = async () => {
  showCurrentJokePunchline.value = false;
  try {
    currentJoke.value = await getRandomJoke();
  } catch (err) {
    console.error('Failed to fetch a random joke:', err);
  } finally {
    currentJokeLoading.value = false;
  }
}

//Joke Table Logic
const jokesTableData = ref([])
const jokeTableDataLoading = ref(true);
const getJokes = async () => {
  jokeTableDataLoading.value = true;
  try {
    jokesTableData.value = await getOneHundredJokes();
  } catch (err) {
    console.error('Failed to fetch one hundred jokes:', err);
  } finally {
    currentJokeLoading.value = false;
  }
}

const handleJokeRatingClick = (rating, joke) => {
  console.log("rating", rating);
  console.log("joke", joke,);
}

onMounted(() => {
  getJoke();
  getJokes();
});
</script>


<style scoped></style>
