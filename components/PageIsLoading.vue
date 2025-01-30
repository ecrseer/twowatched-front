<template>
    <div
        class="flex justify-between items-center gap-4 flex-col page-is-loading"
    >
        <progress class="progress infinite-loading"></progress>
        <img src="/logo.png" alt="logo do app" />
        <footer></footer>
    </div>
</template>

<script lang="ts" setup>
useHead({
    titleTemplate: '',
    title: 'twowatch',
});
</script>
<style lang="scss" scoped>
.page-is-loading {
    height: 100vh;
    width: 100vw;
    background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%
    );
    img {
        opacity: 0.5;
        width: 100px;
    }
}
.infinite-loading {
    width: 113vw;
    transform: translateY(0px);
    height: 4px;
}
</style>
