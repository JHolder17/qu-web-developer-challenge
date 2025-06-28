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
  <div class="my-4 mx-5">
    <JokeTable :jokesTableData="jokesTableData" :allJokes="allJokes" :jokeTableDataLoading="jokeTableDataLoading" @updateJokesTableData="getJokes"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getOneHundredJokes } from '@/api/jokes.js';

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

const chartData = ref();
const allJokes = ref([])
const jokesTableData = ref([])
const jokeTableDataLoading = ref(true);
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



onMounted(async () => {
  await getJokes();
});
</script>


<style scoped></style>
