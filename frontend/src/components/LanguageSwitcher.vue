<script setup>
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '../stores/uiStore';

const uiStore = useUiStore();
const { locale, t } = useI18n();

watch(
  () => uiStore.locale,
  (value) => {
    locale.value = value;
  },
  { immediate: true }
);

const label = computed(() => (uiStore.locale === 'en' ? t('common.english') : t('common.malay')));

const toggleLocale = () => {
  uiStore.setLocale(uiStore.locale === 'en' ? 'ms' : 'en');
};
</script>

<template>
  <button class="control-chip" type="button" @click="toggleLocale">
    <span class="control-chip__badge">{{ uiStore.locale.toUpperCase() }}</span>
    <span>{{ label }}</span>
  </button>
</template>
