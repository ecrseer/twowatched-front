<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-3xl">{{ searching }}</div>
    <MuiList />
    <MuiInput v-model="searching" :label="'searching'" />
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: "",
  title: "twowatch",
});

const searching = ref("");
</script>
