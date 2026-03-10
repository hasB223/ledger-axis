<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import AppLayout from '../components/AppLayout.vue';
import IndustrySummaryChart from '../components/charts/IndustrySummaryChart.vue';
import RevenueBreakdownChart from '../components/charts/RevenueBreakdownChart.vue';
import { fetchIndustrySummary, fetchTopCompanies } from '../api/analyticsApi';

const { t, locale } = useI18n();
const localeMap = { en: 'en-US', ms: 'ms-MY' };

const state = reactive({
  industrySummary: [],
  topCompanies: [],
  loading: false,
  error: null
});

const numberFormatter = computed(
  () => new Intl.NumberFormat(localeMap[locale.value] || 'en-US')
);
const currencyFormatter = computed(
  () => new Intl.NumberFormat(localeMap[locale.value] || 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })
);

const loadAnalytics = async () => {
  state.loading = true;
  state.error = null;
  try {
    const [industrySummary, topCompanies] = await Promise.all([
      fetchIndustrySummary(),
      fetchTopCompanies()
    ]);
    state.industrySummary = industrySummary;
    state.topCompanies = topCompanies;
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loading = false;
  }
};

onMounted(loadAnalytics);
</script>

<template>
  <AppLayout>
    <section class="panel page-header">
      <div>
        <h2>{{ t('analytics.title') }}</h2>
        <p class="muted">{{ t('analytics.subtitle') }}</p>
      </div>
    </section>

    <section v-if="state.error" class="panel card">
      <div class="error-banner">{{ state.error }}</div>
    </section>

    <section class="stats-grid">
      <article class="panel card stat stat--accent">
        <span class="muted">{{ t('analytics.industriesCovered') }}</span>
        <strong>{{ numberFormatter.format(state.industrySummary.length) }}</strong>
      </article>
      <article class="panel card stat">
        <span class="muted">{{ t('analytics.topCompanyRevenue') }}</span>
        <strong>{{ currencyFormatter.format(Number(state.topCompanies[0]?.revenue || 0)) }}</strong>
      </article>
      <article class="panel card stat">
        <span class="muted">{{ t('analytics.topCompanyDirectors') }}</span>
        <strong>{{ numberFormatter.format(state.topCompanies[0]?.director_count || 0) }}</strong>
      </article>
    </section>

    <section class="dashboard-grid">
      <IndustrySummaryChart :items="state.industrySummary" />
      <RevenueBreakdownChart :items="state.topCompanies" />
    </section>

    <section class="panel card">
      <h3>{{ t('analytics.industrySummary') }}</h3>
      <div class="table-shell">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('companies.industry') }}</th>
              <th>{{ t('analytics.companies') }}</th>
              <th>{{ t('analytics.avgRevenue') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="state.loading">
              <td colspan="3">{{ t('analytics.loading') }}</td>
            </tr>
            <tr v-for="industry in state.industrySummary" :key="industry.industry">
              <td>{{ industry.industry }}</td>
              <td>{{ numberFormatter.format(industry.company_count) }}</td>
              <td>{{ currencyFormatter.format(Number(industry.avg_revenue)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel card">
      <h3>{{ t('analytics.topCompanies') }}</h3>
      <div class="table-shell">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('companies.name') }}</th>
              <th>{{ t('companies.industry') }}</th>
              <th>{{ t('companies.revenue') }}</th>
              <th>{{ t('companies.employees') }}</th>
              <th>{{ t('analytics.directors') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="state.loading">
              <td colspan="5">{{ t('analytics.loading') }}</td>
            </tr>
            <tr v-for="company in state.topCompanies" :key="company.id">
              <td>{{ company.name }}</td>
              <td>{{ company.industry }}</td>
              <td>{{ currencyFormatter.format(Number(company.revenue)) }}</td>
              <td>{{ numberFormatter.format(Number(company.employee_count)) }}</td>
              <td>{{ numberFormatter.format(company.director_count) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </AppLayout>
</template>
