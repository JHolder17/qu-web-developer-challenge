<template>
  <div class="w-full max-w-[450px] mx-auto">
    <div class="text-xl font-bold">Donut Chart</div>
    <Chart type="doughnut" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  donutChartData: number[]
}>();

const chartData = computed(() => ({
  labels: ['General', 'Programming', 'Dad', 'Knock-Knock'],
  datasets: [
    {
      data: props.donutChartData,
      backgroundColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
      hoverBackgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)']
    }
  ]
}));

const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--p-text-color');
const chartOptions = {
  plugins: {
    legend: {
      labels: {
        cutout: '10%',
        color: textColor
      }
    }
  }
};
</script>