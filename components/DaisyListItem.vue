<template>
  <li class="m-2 rounded-box shadow-xl daisy-list-item">
    <a>
      {{ item.name }}
      <span
          v-if="item.badge"
          class="badge badge-sm badge-warning"
          @click="item.onBadgeClick"
      >{{ item.badge }}</span
      >
    </a>
  </li>
</template>
<script setup lang="ts">
import type {iDaisyListItem} from "~/components/DaisyList.vue";

defineProps<{
  item: iDaisyListItem
}>()

</script>
<style scoped>
.daisy-list-item {
  background-image: url("https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg");
}

</style>