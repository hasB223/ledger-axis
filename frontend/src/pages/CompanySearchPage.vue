<script setup>
import { computed, onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AppLayout from '../components/AppLayout.vue';
import PaginationControls from '../components/PaginationControls.vue';
import { fetchCompanies, searchCompanies } from '../api/companyApi';

const { t, locale } = useI18n();
const localeMap = { en: 'en-US', ms: 'ms-MY' };

const state = reactive({
  query: '',
  companies: [],
  pagination: { page: 1, totalPages: 1, total: 0, limit: 20 },
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
        <h2>{{ t('companies.title') }}</h2>
        <p class="muted">{{ t('companies.subtitle') }}</p>
      </div>
      <div class="toolbar toolbar--search">
        <input v-model="state.query" :placeholder="t('companies.searchPlaceholder')" @keyup.enter="loadCompanies(1)" />
        <button class="button" @click="loadCompanies(1)">{{ t('common.search') }}</button>
      </div>
    </section>

    <section class="panel card">
      <div v-if="state.error" class="error-banner">{{ state.error }}</div>
      <p class="muted">{{ t('companies.total', { count: numberFormatter.format(state.pagination.total) }) }}</p>

      <div class="table-shell">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('companies.name') }}</th>
              <th>{{ t('companies.registration') }}</th>
              <th>{{ t('companies.industry') }}</th>
              <th>{{ t('companies.revenue') }}</th>
              <th>{{ t('companies.employees') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="state.loading">
              <td colspan="5">{{ t('companies.loading') }}</td>
            </tr>
            <tr v-for="company in state.companies" :key="company.id">
              <td>
                <RouterLink :to="`/companies/${company.id}`">{{ company.name }}</RouterLink>
              </td>
              <td>{{ company.registrationNumber }}</td>
              <td>{{ company.industry }}</td>
              <td>{{ currencyFormatter.format(Number(company.revenue)) }}</td>
              <td>{{ numberFormatter.format(company.employeeCount) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PaginationControls
        :page="state.pagination.page"
        :total-pages="state.pagination.totalPages"
        @previous="loadCompanies(state.pagination.page - 1)"
        @next="loadCompanies(state.pagination.page + 1)"
      />
    </section>
  </AppLayout>
</template>
