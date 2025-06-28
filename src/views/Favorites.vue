<template>
  <div class="favorites">
    <Card class="mt-2" style="width: 100%;">
      <template #title>
        <span class="text-xl font-bold">Favorite Jokes</span>
      </template>
      <template #content>
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
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import Rating from 'primevue/rating';
import ProgressSpinner from 'primevue/progressspinner';

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
