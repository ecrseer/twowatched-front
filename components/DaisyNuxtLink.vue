<template>
  <NuxtLink class="tab"
            :class="{
          'tab-active':current_route===href,
          'text-base-content':current_route===href,
          'text-primary-content':current_route!==href,
        }"
            :to="href">
    <p class="text-sm">
      <slot/>
    </p>
  </NuxtLink>
</template>
<script setup lang="ts">
const route = useRoute()
const current_route = computed(() => route.path)
defineProps<{ href: string }>()
</script>