import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import CompanySearchPage from '../pages/CompanySearchPage.vue';
import CompanyDetailPage from '../pages/CompanyDetailPage.vue';
import AnalyticsDashboardPage from '../pages/AnalyticsDashboardPage.vue';
import { useAuthStore } from '../stores/authStore';

const routes = [
  { path: '/login', name: 'login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/', redirect: '/companies' },
  { path: '/companies', name: 'companies', component: CompanySearchPage, meta: { requiresAuth: true } },
  { path: '/companies/:id', name: 'company-detail', component: CompanyDetailPage, meta: { requiresAuth: true } },
  { path: '/analytics', name: 'analytics', component: AnalyticsDashboardPage, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  await authStore.bootstrap();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' };
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'companies' };
  }

  return true;
});

export default router;
