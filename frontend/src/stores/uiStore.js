import { defineStore } from 'pinia';

const THEME_KEY = 'ledgeraxis_theme';
const LOCALE_KEY = 'ledgeraxis_locale';

const getPreferredTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
};

const applyLocale = (locale) => {
  document.documentElement.lang = locale;
};

export const useUiStore = defineStore('ui', {
  state: () => ({
    theme: 'light',
    locale: 'en'
  }),
  actions: {
    initialize() {
      const savedTheme = localStorage.getItem(THEME_KEY);
      const savedLocale = localStorage.getItem(LOCALE_KEY);
      this.theme = savedTheme || getPreferredTheme();
      this.locale = savedLocale || 'en';
      applyTheme(this.theme);
      applyLocale(this.locale);
    },
    setTheme(theme) {
      this.theme = theme;
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
    },
    toggleTheme() {
      this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    },
    setLocale(locale) {
      this.locale = locale;
      localStorage.setItem(LOCALE_KEY, locale);
      applyLocale(locale);
    }
  }
});
