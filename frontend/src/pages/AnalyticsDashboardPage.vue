<script setup>
import { onMounted, reactive } from 'vue';
import AppLayout from '../components/AppLayout.vue';
import { fetchIndustrySummary, fetchTopCompanies } from '../api/analyticsApi';

const state = reactive({
  industrySummary: [],
  topCompanies: [],
  loading: false,
  error: null
});

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
        <h2>Analytics Dashboard</h2>
        <p class="muted">Revenue concentration, industry distribution, and director-linked top performers.</p>
      </div>
    </section>

    <section v-if="state.error" class="panel card">
      <div class="error-banner">{{ state.error }}</div>
    </section>

    <section class="stats-grid">
      <article class="panel card stat">
        <span class="muted">Industries Covered</span>
        <strong>{{ state.industrySummary.length }}</strong>
      </article>
      <article class="panel card stat">
        <span class="muted">Top Company Revenue</span>
        <strong>${{ Number(state.topCompanies[0]?.revenue || 0).toLocaleString() }}</strong>
      </article>
      <article class="panel card stat">
        <span class="muted">Top Company Directors</span>
        <strong>{{ state.topCompanies[0]?.director_count || 0 }}</strong>
      </article>
    </section>

    <section class="panel card">
      <h3>Industry Summary</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Industry</th>
            <th>Companies</th>
            <th>Average Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="state.loading">
            <td colspan="3">Loading analytics...</td>
          </tr>
          <tr v-for="industry in state.industrySummary" :key="industry.industry">
            <td>{{ industry.industry }}</td>
            <td>{{ industry.company_count }}</td>
            <td>${{ Number(industry.avg_revenue).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="panel card">
      <h3>Top Companies by Revenue</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Revenue</th>
            <th>Employees</th>
            <th>Directors</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in state.topCompanies" :key="company.id">
            <td>{{ company.name }}</td>
            <td>{{ company.industry }}</td>
            <td>${{ Number(company.revenue).toLocaleString() }}</td>
            <td>{{ Number(company.employee_count).toLocaleString() }}</td>
            <td>{{ company.director_count }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </AppLayout>
</template>
