<template>
    <div class="relative float-label-input">
        <input
            :type="input_opts.type"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target?.value)"
            class="w-full focus:outline-none bg-base-100 text-primary-focus focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-fuchsia-400"
        />

        <label
            v-if="label"
            for="name"
            class="absolute top-3 left-0 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-white"
            >{{ props.label }}</label
        >
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    modelValue: string;
    label?: string;
    type?: string;
}>();

const input_opts = computed(() => {
    return {
        type: props.type || 'text',
    };
});

const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();
</script>
<style scoped>
.float-label-input {
    margin: 32px 0;
}

label {
    height: 1rem;
    display: flex;
    align-items: center;
}

.float-label-input:focus-within label,
.float-label-input input:not(:placeholder-shown) + label {
    transform: translateY(-1.5rem) scale(0.75);
    background-color: hsl(var(--b1));
}
</style>
