<template>
  <div class="my-3 pl-5 text-3xl">Dashboard</div>
  <div class="space-y-4">
    <div class="flex flex-col mx-5 md:flex-row gap-4">
      <div class="flex-1 bg-white p-4 rounded">
        <BarChart :barChartData="chartData" />
      </div>
      <div class="flex-1 bg-white p-4 rounded">
        <DonutChart :donutChartData="chartData" />
      </div>
    </div>
  </div>
  <Card class="my-4 mx-5">
    <template #title>
      <div class="flex flex-wrap align-items-baseline justify-content-between">
        <span class="text-xl font-bold">Top 100 Jokes</span>
        <Button icon="pi pi-refresh" rounded raised @click="getJokes" />
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-wrap gap-2">
        <Button label="All Jokes" size="small" @click="() => handleFilterClick('all')" />
        <Button label="General" size="small" @click="() => handleFilterClick('general')" />
        <Button label="Programming" size="small" @click="() => handleFilterClick('programming')" />
        <Button label="Dad" size="small" @click="() => handleFilterClick('dad')" />
        <Button label="Knock-Knock" size="small" @click="() => handleFilterClick('knock-knock')" />
      </div>
    </template>
    <template #content v-if="!jokeTableDataLoading">
      <DataTable :value="jokesTableData" stripedRows tableStyle="min-width: 50rem" paginator :rows="10"
        :rowsPerPageOptions="[10, 20, 50]" class="mb-1">
        <Column field="type" header="Category" sortable style="width: 10%"></Column>
        <Column field="setup" header="Setup" sortable style="width: 50%"></Column>
        <Column field="punchline" header="Punchline" style="width: 30%">
          <template #body="slotProps">
            <Button v-if="!revealedJokeIds.includes(slotProps.data.id)"
              @click="() => handleJokeRevealClick(slotProps.data.id)" label="Reveal Punchline" size="small" />
            <div v-else>
              {{ slotProps.data.punchline }}
            </div>
          </template>
        </Column>
        <Column field="rating" header="Rating" sortable style="width: 10%">
          <template #body="slotProps">
            <Rating :modelValue="slotProps.data.rating"
              @update:modelValue="(value) => handleJokeRatingClick(value, slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </template>
    <template #content v-else>
      <div class="flex justify-center">
        <ProgressSpinner />
      </div>
    </template>
  </Card>
</template>

<script setup>
//clean up component imports and move them to main.ts
// https://primevue.org/autoimport/
import { ref, onMounted } from 'vue';
import { getOneHundredJokes } from '@/api/jokes.js';

const chartData = ref();

const jokeByType = () => {
  const counts = allJokes.value.reduce((acc, joke) => {
    if (acc[joke.type] !== undefined) {
      acc[joke.type]++;
    }
    return acc;
  }, {
    general: 0,
    programming: 0,
    dad: 0,
    'knock-knock': 0
  });

  return [counts.general, counts.programming, counts.dad, counts['knock-knock']];
}

//Joke Table Logic
const allJokes = ref([])
let jokesTableData = ref([])
let jokeTableDataLoading = ref(true);
const getJokes = async () => {
  jokeTableDataLoading.value = true;
  try {
    // need to account for ratings of favorite jokes in local storage so they show up with rating
    const jokes = await getOneHundredJokes();
    allJokes.value = jokes;
    chartData.value = jokeByType();
    jokesTableData.value = jokes;
  } catch (err) {
    console.error('Failed to fetch one hundred jokes:', err);
  } finally {
    jokeTableDataLoading.value = false;
  }
}

const handleJokeRatingClick = (rating, joke) => {
  joke.rating = rating;

  const favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
  const index = favorites.findIndex(j => j.id === joke.id);

  if (index !== -1) {
    favorites[index] = joke;
  } else {
    favorites.push(joke);
  }

  localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
}

const revealedJokeIds = ref([]);
const handleJokeRevealClick = (id) => {
  if (!revealedJokeIds.value.includes(id)) {
    revealedJokeIds.value.push(id);
  }
}

const handleFilterClick = (category) => {
  if (!category || category === 'all') {
    jokesTableData.value = allJokes.value;
    return;
  }

  jokesTableData.value = allJokes.value.filter(joke => joke.type === category);
}

onMounted(async () => {
  await getJokes();
});
</script>


<style scoped></style>
