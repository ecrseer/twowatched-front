<template>
  <div class="bg-white dark:bg-pink-950 dark:text-white flex-col flex-1 px-6">
    <div class="text-3xl">{{ searching }}</div>
    <MuiInput v-model="searching" :label="'searching'" />
    <MuiList />
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: "",
  title: "twowatch",
});

const searching = ref("");
</script>
