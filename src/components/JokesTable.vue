<template>
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

<script setup lang="ts">
import { ref } from 'vue';
import type { Joke } from '@/types/Joke';
import { useFavoriteJokes } from '@/composables/useFavoriteJokes';

const props = defineProps({
  tableData: Array as () => Joke[],
  allJokes: Array as () => Joke[],
  activeCategory: String,
});

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
</script>