<script setup lang="ts">
defineProps<{
    username: string;
    content: string;
    likeBtnFx?: () => void;
}>();
</script>

<template>
    <li class="rounded-md py-4 px-2 shadow-lg shadow-primary">
        <div class="dy-listitem flex flex-col">
            <section class="flex gap-2 items-center border-b border-primary">
                <div class="mb-1">
                    <img
                        class="dy-listitem-img rounded-box"
                        src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                    />
                </div>
                <div class="text-[0.52rem] uppercase font-semibold opacity-60">
                    {{ username }}
                </div>
            </section>
            <section>
                <p class="text-left text-sm text-[0.85rem]">
                    {{ content }}
                </p>
                <button class="btn btn-square btn-ghost" v-if="likeBtnFx">
                    <svg
                        class="size-[10px] w-[30px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                            ></path>
                        </g>
                    </svg>
                </button>
            </section>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.dy-listitem {
    .dy-listitem-img {
        width: 1.2rem;
    }
}
</style>
