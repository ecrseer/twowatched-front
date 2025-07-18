<template>
    <fieldset class="fieldset">
        <legend
            class="fieldset-legend"
            :type="input_opts.type"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target?.value)"
        >
            {{ props.label }}
        </legend>
        <input
            type="text"
            class="input border-primary"
            :placeholder="props.placeholder"
        />
        <slot />
    </fieldset>
</template>
<script setup lang="ts">
const props = defineProps<{
    modelValue: string;
    label?: string;
    type?: string;
    placeholder?: string;
}>();

const input_opts = computed(() => {
    return {
        type: props.type || 'text',
    };
});

const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();
</script>
