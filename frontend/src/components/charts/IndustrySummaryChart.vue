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

const { t } = useI18n();
const uiStore = useUiStore();

const series = computed(() => [
  {
    name: t('analytics.companies'),
    data: props.items.map((item) => Number(item.company_count))
  }
]);

const chartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    foreColor: 'var(--text-soft)'
  },
  theme: { mode: uiStore.theme },
  xaxis: {
    categories: props.items.map((item) => item.industry),
    labels: { rotate: -25 }
  },
  yaxis: {
    labels: {
      formatter: (value) => Number(value).toFixed(0)
    }
  },
  dataLabels: { enabled: false },
  stroke: { width: 0 },
  colors: ['#14b8a6'],
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: '48%'
    }
  },
  grid: {
    borderColor: 'rgba(148, 163, 184, 0.18)'
  },
  tooltip: {
    theme: uiStore.theme
  }
}));
</script>

<template>
  <div class="chart-card panel card">
    <div class="chart-card__header">
      <h3>{{ t('analytics.industryChartTitle') }}</h3>
    </div>
    <VueApexCharts type="bar" height="320" :options="chartOptions" :series="series" />
  </div>
</template>
