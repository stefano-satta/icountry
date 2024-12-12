<script lang="ts" setup>
  const {text} = defineProps<{text: string}>();
</script>

<template>
  <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {{text}}
  </div>
</template>

<style scoped></style>