<template>
  <AddJokeForm @updateFavoritesTableData="getFavoriteJokes" />
  <Card class="my-4 mx-5">
    <template #title>
      <span class="text-xl font-bold">Favorite Jokes</span>
    </template>
    <template #content>
      <DataTable :value="favorites" stripedRows paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" class="mb-1">
        <Column field="type" header="Category" sortable style="width: 10%"></Column>
        <Column field="setup" header="Setup" sortable style="width: 50%"></Column>
        <Column field="punchline" header="Punchline" style="width: 30%">
        </Column>
        <Column field="rating" header="Rating" sortable style="width: 10%">
          <template #body="slotProps">
            <Rating :modelValue="slotProps.data.rating"
              @update:modelValue="(value) => handleJokeRatingClick(value, slotProps.data)" />
          </template>
        </Column>
        <Column style="width: 10%">
          <template #body="slotProps">
            <Button icon="pi pi-trash" @click="() => handleRemoveFavorite(slotProps.data)" />
          </template>
        </Column>
        <template #empty>
          <div class="text-center py-10 text-gray-500">
            You have no favorite jokes yet ¯\_(ツ)_/¯
          </div>
        </template>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import type { Joke } from '@/types/Joke';

const favoritesStore = useFavoritesStore();
const favorites = computed(() => favoritesStore.favorites);

const getFavoriteJokes = () => {
  favoritesStore.loadFromLocalStorage();
}

const handleJokeRatingClick = (rating: number, joke: Joke) => {
  favoritesStore.updateJokeRating(rating, joke);
}

const handleRemoveFavorite = (joke: any) => {
  favoritesStore.removeFavorite(joke);
}

onMounted(() => {
  favoritesStore.initializeStore();
});
</script>
