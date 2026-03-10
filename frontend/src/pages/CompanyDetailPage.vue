<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AppLayout from '../components/AppLayout.vue';
import { fetchCompany, fetchCompanyDirectors } from '../api/companyApi';

const route = useRoute();
const { t, locale } = useI18n();
const localeMap = { en: 'en-US', ms: 'ms-MY' };

const state = reactive({
  company: null,
  directors: [],
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
        <h2>{{ state.company?.name || t('companyDetail.fallbackTitle') }}</h2>
        <p class="muted">{{ t('companyDetail.subtitle') }}</p>
      </div>
    </section>

    <section v-if="state.error" class="panel card">
      <div class="error-banner">{{ state.error }}</div>
    </section>

    <section v-if="state.company" class="panel card detail-grid">
      <div class="stat stat--accent">
        <span class="muted">{{ t('companyDetail.registrationNumber') }}</span>
        <strong>{{ state.company.registrationNumber }}</strong>
      </div>
      <div class="stat">
        <span class="muted">{{ t('companyDetail.industry') }}</span>
        <strong>{{ state.company.industry }}</strong>
      </div>
      <div class="stat">
        <span class="muted">{{ t('companyDetail.revenue') }}</span>
        <strong>{{ currencyFormatter.format(Number(state.company.revenue)) }}</strong>
      </div>
      <div class="stat">
        <span class="muted">{{ t('companyDetail.employeeCount') }}</span>
        <strong>{{ numberFormatter.format(state.company.employeeCount) }}</strong>
      </div>
    </section>

    <section class="panel card">
      <h3>{{ t('companyDetail.directors') }}</h3>
      <div class="table-shell">
        <table class="table">
          <thead>
            <tr>
              <th>{{ t('companyDetail.fullName') }}</th>
              <th>{{ t('companyDetail.nationality') }}</th>
              <th>{{ t('companyDetail.birthYear') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="state.loading">
              <td colspan="3">{{ t('companyDetail.loading') }}</td>
            </tr>
            <tr v-else-if="state.directors.length === 0">
              <td colspan="3">{{ t('companyDetail.empty') }}</td>
            </tr>
            <tr v-for="director in state.directors" :key="director.id">
              <td>{{ director.fullName }}</td>
              <td>{{ director.nationality }}</td>
              <td>{{ director.birthYear }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </AppLayout>
</template>
