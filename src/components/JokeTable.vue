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
      <DataTable :value="tableData" stripedRows tableStyle="min-width: 50rem" paginator :rows="10"
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
        <template #empty>
          <div class="text-center py-10 text-gray-500">
            Sorry no {{ activeCategory }} jokes ¯\_(ツ)_/¯
          </div>
        </template>
      </DataTable>
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
import { useFavoriteJokes } from '@/composables/useFavoriteJokes';
import FilterBar from './FilterBar.vue';

const props = defineProps({
  jokesTableData: Array,
  allJokes: Array,
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

const { updateJokeRating } = useFavoriteJokes();

const handleJokeRatingClick = (rating: number, joke: Joke) => {
  updateJokeRating(rating, joke);
};

const revealedJokeIds = ref<number[]>([]);
const handleJokeRevealClick = (id: number) => {
  if (!revealedJokeIds.value.includes(id)) {
    revealedJokeIds.value.push(id);
  }
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
