<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import { fetchCompany, fetchCompanyDirectors } from '../api/companyApi';

const route = useRoute();

const state = reactive({
  company: null,
  directors: [],
  loading: false,
  error: null
});

const loadCompany = async () => {
  state.loading = true;
  state.error = null;
  try {
    const [company, directorsPayload] = await Promise.all([
      fetchCompany(route.params.id),
      fetchCompanyDirectors(route.params.id)
    ]);
    state.company = company;
    state.directors = directorsPayload.directors;
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loading = false;
  }
};

onMounted(loadCompany);
</script>

<template>
  <AppLayout>
    <section class="panel page-header">
      <div>
        <h2>{{ state.company?.name || 'Company Detail' }}</h2>
        <p class="muted">Detailed tenant-scoped company profile and director roster.</p>
      </div>
    </section>

    <section v-if="state.error" class="panel card">
      <div class="error-banner">{{ state.error }}</div>
    </section>

    <section v-if="state.company" class="panel card detail-grid">
      <div class="stat">
        <span class="muted">Registration Number</span>
        <strong>{{ state.company.registrationNumber }}</strong>
      </div>
      <div class="stat">
        <span class="muted">Industry</span>
        <strong>{{ state.company.industry }}</strong>
      </div>
      <div class="stat">
        <span class="muted">Revenue</span>
        <strong>${{ Number(state.company.revenue).toLocaleString() }}</strong>
      </div>
      <div class="stat">
        <span class="muted">Employee Count</span>
        <strong>{{ state.company.employeeCount.toLocaleString() }}</strong>
      </div>
    </section>

    <section class="panel card">
      <h3>Directors</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Nationality</th>
            <th>Birth Year</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="state.loading">
            <td colspan="3">Loading company detail...</td>
          </tr>
          <tr v-else-if="state.directors.length === 0">
            <td colspan="3">No directors assigned.</td>
          </tr>
          <tr v-for="director in state.directors" :key="director.id">
            <td>{{ director.fullName }}</td>
            <td>{{ director.nationality }}</td>
            <td>{{ director.birthYear }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </AppLayout>
</template>
