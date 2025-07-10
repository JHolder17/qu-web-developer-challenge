<template>
  <div class="flex flex-wrap gap-2">
    <Button label="All Jokes" size="small" @click="() => handleFilterClick('all')" />
    <Button label="General" size="small" @click="() => handleFilterClick('general')" />
    <Button label="Programming" size="small" @click="() => handleFilterClick('programming')" />
    <Button label="Dad" size="small" @click="() => handleFilterClick('dad')" />
    <Button label="Knock-Knock" size="small" @click="() => handleFilterClick('knock-knock')" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import type { JokeFilter } from '@/types/Joke';

const emit = defineEmits<{
  (e: 'filter', category: JokeFilter): void;
}>();

const handleFilterClick = (category: JokeFilter) => {
  emit('filter', category);
};
</script>