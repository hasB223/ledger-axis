<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../stores/authStore';
import ThemeToggle from './ThemeToggle.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();
const tenantName = computed(() => authStore.user?.tenantName || t('common.tenant'));

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="app-shell">
    <div class="page-grid">
      <aside class="panel sidebar">
        <div>
          <h1>{{ t('appName') }}</h1>
          <p class="muted sidebar__tenant">{{ tenantName }}</p>
        </div>

        <div class="sidebar__controls">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <nav>
          <router-link to="/companies">{{ t('nav.companies') }}</router-link>
          <router-link to="/analytics">{{ t('nav.analytics') }}</router-link>
        </nav>

        <div class="sidebar__footer">
          <p class="muted">{{ authStore.user?.fullName }}</p>
          <button class="button-secondary" @click="logout">{{ t('nav.logout') }}</button>
        </div>
      </aside>
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>
