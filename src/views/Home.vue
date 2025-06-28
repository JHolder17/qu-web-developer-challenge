<template>
  <div class="grid">
    <div class="col-12">
      <div>Jokes Dashboard</div>
    </div>
    <div class="col-6">
      <Card>
        <template #content>
          <Chart type="bar" :data="barChartData"></Chart>
        </template>
      </Card>
    </div>
    <div class="col-6">
      <Card>
        <template #content>
          <div class="text-center p-3 border-round-sm bg-primary font-bold">Right Chart</div>
        </template>
      </Card>
    </div>
    <div class="col-12">
      <Card class="mt-2" style="width: 100%;">
        <template #title>
          <div class="flex flex-wrap items-center align-items-baseline justify-content-between">
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
    </div>
  </div>
</template>

<script setup>
//clean up component imports and move them to main.ts
// https://primevue.org/autoimport/
import { ref, onMounted } from 'vue';
import { getOneHundredJokes } from '@/api/jokes.js';
import Card from 'primevue/card';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Rating from 'primevue/rating';
import ProgressSpinner from 'primevue/progressspinner';
import Chart from 'primevue/chart';
import { all } from 'axios';

//Bar chart
const barChartData = ref();
const barChartOptions = ref();
const setChartData = () => {
  return {
    labels: ['General', 'Programming', 'Dad', 'Knock-Knock'],
    datasets: [
      {
        label: 'Jokes',
        data: jokeByType(),
        backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
        borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
        borderWidth: 1
      }
    ]
  }
}
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
  }

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
  barChartData.value = setChartData();
  barChartOptions.value = setChartOptions();
});
</script>


<style scoped></style>
