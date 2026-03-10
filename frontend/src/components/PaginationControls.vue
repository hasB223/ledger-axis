<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});

const emit = defineEmits(['previous', 'next']);
const { t } = useI18n();
</script>

<template>
  <div class="button-row pagination-row">
    <button class="button-secondary" :disabled="page <= 1" @click="emit('previous')">Previous</button>
    <span class="muted">{{ t('common.page', { page, totalPages }) }}</span>
    <button class="button-secondary" :disabled="page >= totalPages" @click="emit('next')">Next</button>
  </div>
</template>
