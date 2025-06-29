<template>
  <Card class="my-4 mx-5">
    <template #title>
      <span class="text-xl font-bold">Favorite Jokes</span>
    </template>
    <template #content>
      <!-- empty state -->
      <DataTable :value="favorites" stripedRows tableStyle="min-width: 50rem" paginator :rows="10"
        :rowsPerPageOptions="[10, 20, 50]" class="mb-1">
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
            You have no favorite jokes yet ¯\_(ツ)_/¯.
          </div>
        </template>
      </DataTable>
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const favorites = ref([]);
const loadFavorites = () => {
  const favoritesString = localStorage.getItem('favoriteJokes') || '';
  favorites.value = JSON.parse(favoritesString)
}

const handleJokeRatingClick = (rating, joke) => {
  joke.rating = rating;

  const favorites = JSON.parse(localStorage.getItem('favoriteJokes') || '[]') || [];
  const index = favorites.findIndex(j => j.id === joke.id);

  if (index !== -1) {
    favorites[index] = joke;
  } else {
    favorites.push(joke);
  }

  localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
}

const handleRemoveFavorite = (joke) => {
  console.log(joke)
  const stored = JSON.parse(localStorage.getItem('favoriteJokes') || '[]');
  const updated = stored.filter(j => j.id !== joke.id);

  localStorage.setItem('favoriteJokes', JSON.stringify(updated));

  favorites.value = updated;
}
onMounted(() => {
  loadFavorites();
});
</script>



<style></style>
