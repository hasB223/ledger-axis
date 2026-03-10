<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '../stores/authStore';
import ThemeToggle from '../components/ThemeToggle.vue';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

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
      <div class="auth-toolbar">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div class="card auth-intro" style="padding: 0;">
        <span class="eyebrow">{{ t('appName') }}</span>
        <h2>{{ t('auth.title') }}</h2>
        <p class="muted">{{ t('auth.subtitle') }}</p>
      </div>

      <form class="login-form" @submit.prevent="submit">
        <div v-if="authStore.error" class="error-banner">{{ authStore.error }}</div>

        <label class="field">
          <span>{{ t('auth.email') }}</span>
          <input v-model="form.email" type="email" autocomplete="username" required />
        </label>

        <label class="field">
          <span>{{ t('auth.password') }}</span>
          <input v-model="form.password" type="password" autocomplete="current-password" required />
        </label>

        <button class="button" :disabled="authStore.loading" type="submit">
          {{ authStore.loading ? t('auth.submitting') : t('auth.submit') }}
        </button>
      </form>
    </section>
  </div>
</template>
