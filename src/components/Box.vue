<script setup lang="ts">
  const {label, value} = defineProps<{label: string, value: string, icon: string}>()
</script>

<template>
  <div class="border shadow rounded-3xl p-8 flex justify-between flex-col dark:text-white dark:bg-slate-800 w-full">
    <div class="flex items-center mb-8">
      <i class="fa-solid dark:text-white mr-2" :class="icon"/>
      <h3 class="text-xl">{{label}}</h3>
    </div>
    <p class="text-4xl dark:text-white">{{value}}</p>
  </div>
</template>

<style scoped></style>