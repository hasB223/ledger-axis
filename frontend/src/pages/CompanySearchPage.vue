<script setup>
import { onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import PaginationControls from '../components/PaginationControls.vue';
import { fetchCompanies, searchCompanies } from '../api/companyApi';

const state = reactive({
  query: '',
  companies: [],
  pagination: { page: 1, totalPages: 1, total: 0, limit: 20 },
  loading: false,
  error: null
});

const loadCompanies = async (page = 1) => {
  state.loading = true;
  state.error = null;
  try {
    const params = { page, limit: state.pagination.limit };
    const data = state.query.trim()
      ? await searchCompanies({ ...params, q: state.query.trim() })
      : await fetchCompanies(params);
    state.companies = data.items;
    state.pagination = data.pagination;
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loading = false;
  }
};

onMounted(() => {
  loadCompanies();
});
</script>

<template>
  <AppLayout>
    <section class="panel page-header">
      <div>
        <h2>Company Search</h2>
        <p class="muted">Tenant-isolated records with registration, industry, and revenue visibility.</p>
      </div>
      <div class="toolbar">
        <input v-model="state.query" placeholder="Search by company or registration number" />
        <button class="button" @click="loadCompanies(1)">Search</button>
      </div>
    </section>

    <section class="panel card">
      <div v-if="state.error" class="error-banner">{{ state.error }}</div>
      <p class="muted">Total companies: {{ state.pagination.total }}</p>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Registration</th>
            <th>Industry</th>
            <th>Revenue</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="state.loading">
            <td colspan="5">Loading companies...</td>
          </tr>
          <tr v-for="company in state.companies" :key="company.id">
            <td>
              <RouterLink :to="`/companies/${company.id}`">{{ company.name }}</RouterLink>
            </td>
            <td>{{ company.registrationNumber }}</td>
            <td>{{ company.industry }}</td>
            <td>${{ Number(company.revenue).toLocaleString() }}</td>
            <td>{{ company.employeeCount.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>

      <PaginationControls
        :page="state.pagination.page"
        :total-pages="state.pagination.totalPages"
        @previous="loadCompanies(state.pagination.page - 1)"
        @next="loadCompanies(state.pagination.page + 1)"
      />
    </section>
  </AppLayout>
</template>
