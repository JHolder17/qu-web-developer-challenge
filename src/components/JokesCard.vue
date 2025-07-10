<template>
  <Card>
    <template #title>
      <div class="flex flex-wrap align-items-baseline justify-content-between">
        <span class="text-xl font-bold">Top 100 Jokes</span>
        <Button icon="pi pi-refresh" rounded raised @click="handleGetJokes" />
      </div>
    </template>
    <template #subtitle>
      <FilterBar @filter="handleFilterClick" />
    </template>
    <template #content v-if="!jokeTableDataLoading">
        <JokesTable :tableData="tableData" :allJokes="allJokes" :activeCategory="activeCategory" />
    </template>
    <template #content v-else>
      <div class="flex justify-center">
        <ProgressSpinner />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Joke, JokeFilter } from '@/types/Joke';
import FilterBar from './FilterBar.vue';

const props = defineProps({
  jokesTableData: Array as () => Joke[],
  allJokes: Array as () => Joke[],
  jokeTableDataLoading: Boolean
});

const tableData = ref<Joke[]>([]);
watch(
  () => (props.jokesTableData as Joke[] || []),
  (newData: Joke[]) => {
    tableData.value = [...(newData || [])];
  },
  { immediate: true }
);

const emit = defineEmits(['updateJokesTableData']);
const handleGetJokes = () => {
  emit('updateJokesTableData');
};

const activeCategory = ref<JokeFilter>('all');
const handleFilterClick = (category: JokeFilter) => {
  activeCategory.value = category;
  if (!category || category === 'all') {
    tableData.value = [...((props.allJokes as Joke[]) || [])];
    return;
  }

  tableData.value = (props.allJokes as Joke[]).filter(joke => joke.type === category);
};

</script>
