<template>
  <div class="my-3 pl-5 text-3xl">Jokes Dashboard</div>
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
  <div class="my-4 mx-5">
    <JokeTable :jokesTableData="jokesTableData" :allJokes="allJokes" :jokeTableDataLoading="jokeTableDataLoading" @updateJokesTableData="getJokes"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getOneHundredJokes } from '@/api/jokes.ts';
import type { Joke, JokeType } from '@/types/Joke';

const jokeByType = () => {
  const counts = allJokes.value.reduce((acc, joke) => {
    const type = joke.type as JokeType;
    if (acc[type] !== undefined) {
      acc[type]++;
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

const chartData = computed(() => jokeByType());
const allJokes = ref<Joke[]>([])
const jokesTableData = ref<Joke[]>([])
const jokeTableDataLoading = ref(true);
const getJokes = async () => {
  jokeTableDataLoading.value = true;
  try {
    const jokes = await getOneHundredJokes();
    const favoriteJokesRaw = localStorage.getItem('favoriteJokes');
    const storedFavorites = favoriteJokesRaw ? JSON.parse(favoriteJokesRaw) : [];

    const favoriteMap = new Map((storedFavorites as Joke[]).map((joke: Joke) => [joke.id, joke]));
    const mergedJokes = (jokes as Joke[]).map((joke: Joke) => {
      const favorite = favoriteMap.get(joke.id);
      return favorite ? { ...joke, rating: favorite.rating } : { ...joke, rating: 0 };
    });

    allJokes.value = mergedJokes;
    jokesTableData.value = mergedJokes;

  } catch (err) {
    console.error('Failed to fetch one hundred jokes:', err);
  } finally {
    jokeTableDataLoading.value = false;
  }
}

onMounted(async () => {
  await getJokes();
});
</script>

