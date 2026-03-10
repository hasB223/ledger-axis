<script setup>
defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});

const emit = defineEmits(['previous', 'next']);
</script>

<template>
  <div class="button-row">
    <button class="button-secondary" :disabled="page <= 1" @click="emit('previous')">Previous</button>
    <span class="muted">Page {{ page }} of {{ totalPages }}</span>
    <button class="button-secondary" :disabled="page >= totalPages" @click="emit('next')">Next</button>
  </div>
</template>
