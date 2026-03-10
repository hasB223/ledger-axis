<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const tenantName = computed(() => authStore.user?.tenantName || 'Tenant');

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
          <h1>LedgerAxis</h1>
          <p class="muted">{{ tenantName }}</p>
        </div>
        <nav>
          <router-link to="/companies">Company Search</router-link>
          <router-link to="/analytics">Analytics Dashboard</router-link>
        </nav>
        <div style="margin-top: auto;">
          <p class="muted">{{ authStore.user?.fullName }}</p>
          <button class="button-secondary" @click="logout">Logout</button>
        </div>
      </aside>
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>
