<script setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '../../stores/uiStore';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

const { t, locale } = useI18n();
const uiStore = useUiStore();
const localeMap = { en: 'en-US', ms: 'ms-MY' };

const topItems = computed(() => props.items.slice(0, 5));
const series = computed(() => topItems.value.map((item) => Number(item.revenue)));
const labels = computed(() => topItems.value.map((item) => item.name));

const chartOptions = computed(() => ({
  chart: {
    foreColor: 'var(--text-soft)'
  },
  theme: { mode: uiStore.theme },
  labels: labels.value,
  legend: {
    position: 'bottom'
  },
  colors: ['#14b8a6', '#0f766e', '#22c55e', '#0ea5e9', '#f59e0b'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    colors: ['var(--surface)']
  },
  tooltip: {
    theme: uiStore.theme,
    y: {
      formatter: (value) => new Intl.NumberFormat(localeMap[locale.value] || 'en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(value)
    }
  }
}));
</script>

<template>
  <div class="chart-card panel card">
    <div class="chart-card__header">
      <h3>{{ t('analytics.revenueChartTitle') }}</h3>
    </div>
    <VueApexCharts type="donut" height="320" :options="chartOptions" :series="series" />
  </div>
</template>
