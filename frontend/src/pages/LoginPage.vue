<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: 'seed.admin1@example.com',
  password: 'Password123!'
});

const submit = async () => {
  try {
    await authStore.login(form);
    router.push('/companies');
  } catch (_error) {
    // Error state is handled in the store.
  }
};
</script>

<template>
  <div class="auth-layout">
    <section class="panel auth-card">
      <div class="card" style="padding: 0;">
        <h2>Sign in</h2>
        <p class="muted">Internal access for tenant-scoped company operations and analytics.</p>
      </div>

      <form class="login-form" @submit.prevent="submit">
        <div v-if="authStore.error" class="error-banner">{{ authStore.error }}</div>

        <label class="field">
          <span>Email</span>
          <input v-model="form.email" type="email" autocomplete="username" required />
        </label>

        <label class="field">
          <span>Password</span>
          <input v-model="form.password" type="password" autocomplete="current-password" required />
        </label>

        <button class="button" :disabled="authStore.loading" type="submit">
          {{ authStore.loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>
    </section>
  </div>
</template>
