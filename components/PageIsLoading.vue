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
        rgba(106, 55, 245, 0) 0%,
        rgb(106, 55, 245) 50%,
        rgba(106, 55, 245, 1) 100%
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
