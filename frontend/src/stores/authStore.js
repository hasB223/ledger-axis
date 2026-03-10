import { defineStore } from 'pinia';
import { getCurrentUser, login } from '../api/authApi';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('ledgeraxis_token'),
    user: null,
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const result = await login(credentials);
        this.token = result.token;
        this.user = result.user;
        localStorage.setItem('ledgeraxis_token', result.token);
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async bootstrap() {
      if (!this.token || this.user) {
        return;
      }

      try {
        this.user = await getCurrentUser();
      } catch (_error) {
        this.logout();
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.error = null;
      localStorage.removeItem('ledgeraxis_token');
    }
  }
});
