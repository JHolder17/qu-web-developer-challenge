<template>
  <div class="flex-1 bg-white p-4 rounded">
    <div class="text-xl font-bold">Bar Chart</div>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  barChartData: number[]
}>();

const chartData = computed(() => ({
  labels: ['General', 'Programming', 'Dad', 'Knock-Knock'],
  datasets: [
    {
      label: 'Jokes',
      data: props.barChartData ?? [0, 0, 0, 0],
      backgroundColor: [
        'rgba(249, 115, 22, 0.2)',
        'rgba(6, 182, 212, 0.2)',
        'rgb(107, 114, 128, 0.2)',
        'rgba(139, 92, 246, 0.2)'
      ],
      borderColor: [
        'rgb(249, 115, 22)',
        'rgb(6, 182, 212)',
        'rgb(107, 114, 128)',
        'rgb(139, 92, 246)'
      ],
      borderWidth: 1
    }
  ]
}));

const chartOptions = computed(() => {
  const style = getComputedStyle(document.documentElement);
  return {
    plugins: {
      legend: {
        labels: {
          color: style.getPropertyValue('--p-text-color')
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: style.getPropertyValue('--p-text-muted-color')
        },
        grid: {
          color: style.getPropertyValue('--p-content-border-color')
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: style.getPropertyValue('--p-text-muted-color')
        },
        grid: {
          color: style.getPropertyValue('--p-content-border-color')
        }
      }
    }
  };
});
</script>
