<template>
    <ul class="menu w-96 flex flex-row gap-4" v-if="items">
        <DaisyListItem v-for="item in items" :key="item.name" :item="item" />
    </ul>
</template>
<script setup lang="ts">
import DaisyListItem from '~/components/DaisyListItem.vue';

export interface iDaisyListItem {
    name: string;
    badge?: string;
    icon: string;
    onBadgeClick: () => Promise<any>;
    tagline?: string;
}

defineProps<{
    items?: iDaisyListItem[];
}>();
const emit = defineEmits<{ (e: 'badgeClick', val?: string): void }>();
</script>
