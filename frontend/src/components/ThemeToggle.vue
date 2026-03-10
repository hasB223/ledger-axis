<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '../stores/uiStore';

const { t } = useI18n();
const uiStore = useUiStore();
const isDark = computed(() => uiStore.theme === 'dark');
</script>

<template>
  <button class="control-chip" type="button" @click="uiStore.toggleTheme()">
    <span class="control-chip__dot" :class="{ 'is-dark': isDark }"></span>
    <span>{{ isDark ? t('common.dark') : t('common.light') }}</span>
  </button>
</template>
