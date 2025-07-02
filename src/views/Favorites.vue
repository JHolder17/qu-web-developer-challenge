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
        <Column field="" header="" style="width: 10%">
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
import { ref, onMounted } from 'vue';
import type { Joke } from '@/types/Joke';

const favorites = ref<Joke[]>([]);
const getFavoriteJokes = () => {
  const favoritesString = localStorage.getItem('favoriteJokes') || '';
  favorites.value = JSON.parse(favoritesString)
}

// TODO: Move all localStorage logic into a composable for better reusability
const handleJokeRatingClick = (rating: number, joke: Joke) => {
  joke.rating = rating;

  const favorites = JSON.parse(localStorage.getItem('favoriteJokes') || '[]') || [];
  const index = favorites.findIndex((j: Joke) => j.id === joke.id);

  if (index !== -1) {
    favorites[index] = joke;
  } else {
    favorites.push(joke);
  }

  localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
}

const handleRemoveFavorite = (joke: Joke) => {
  const stored = JSON.parse(localStorage.getItem('favoriteJokes') || '[]');
  const updated = stored.filter((j: Joke) => j.id !== joke.id);

  localStorage.setItem('favoriteJokes', JSON.stringify(updated));

  favorites.value = updated;
}
onMounted(() => {
  getFavoriteJokes();
});
</script>
