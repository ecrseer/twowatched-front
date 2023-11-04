<template>
  <div class="relative float-label-input">
    <input
      type="text"
      id="name"
      placeholder=" "
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target?.value)"
      class="block w-full dark:text-white bg-white dark:bg-fuchsia-950 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-fuchsia-400"
    />
    <button class="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
    <label
      for="name"
      class="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
      >{{ props.label }}</label
    >
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
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
  background-color: rgb(74 4 78 / var(--tw-bg-opacity));
}
</style>
