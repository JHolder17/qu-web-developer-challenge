<template>
  <Card class="my-4 mx-5">
    <template #title>
      <span class="text-xl font-bold">Add a joke</span>
    </template>
    <template #content>
      <div class="flex flex-col md:flex-row w-full gap-4">
        <div class="w-full md:w-[40%]">
          <InputText v-model="setup" name="setup" type="text" placeholder="Setup" :invalid="setupErr" class="w-full" />
          <Message class="mt-1" v-if="setupErr" size="small" severity="secondary" variant="simple">Please enter a setup.
          </Message>
        </div>
        <div class="w-full md:w-[40%]">
          <InputText v-model="punchline" name="punchline" type="text" placeholder="Punchline" :invalid="punchlineErr"
            class="w-full" />
          <Message class="mt-1" v-if="punchlineErr" size="small" severity="secondary" variant="simple">Please enter a
            punchline.</Message>
        </div>
        <div class="w-full md:w-auto">
          <Select v-model="category" :options="categoryItems" class="w-full md:w-auto" />
        </div>
        <div class="w-full md:w-auto">
          <Button type="submit" severity="primary" label="Submit" @click="handleAddJoke" class="w-full md:w-auto" />
        </div>
      </div>
    </template>
  </Card>
  <Toast position="center"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Joke, JokeType } from '@/types/Joke';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const emit = defineEmits(['updateFavoritesTableData']);

const setup = ref('');
const punchline = ref('');
const setupErr = ref(false);
const punchlineErr = ref(false);
const category = ref<JokeType>('general');
const categoryItems: JokeType[] = ['general', 'programming', 'dad', 'knock-knock'];

// TODO: Add explicit validation for `category` instead of defaulting to 'general'
const validateForm = () => {
  setupErr.value = setup.value.trim().length === 0
  punchlineErr.value = punchline.value.trim().length === 0
  return !(setupErr.value || punchlineErr.value)
};

const handleAddJoke = () => {
  if (!validateForm()) return;

  const stored = localStorage.getItem('favoriteJokes');
  const jokes = stored ? JSON.parse(stored) : [];
  const newId = `j-${Date.now()}`;

  const newJoke: Joke = {
    id: newId,
    type: category.value,
    setup: setup.value,
    punchline: punchline.value,
  };

  jokes.push(newJoke);
  localStorage.setItem('favoriteJokes', JSON.stringify(jokes));
  toast.add({ severity: 'success', summary: 'Joke successfully added', life: 3000});
  emit('updateFavoritesTableData');
  setup.value = '';
  punchline.value = '';
  category.value = 'general';
};
</script>
