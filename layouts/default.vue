<template>
  <div class="h-full w-full font-sans">
    <div class="h-full">
      <main class="flex justify-center items-center">
        <slot />
        <div class="flex justify-center items-center fixed bottom-10 w-full">
          <DaisyMenu />
        </div>
      </main>
    </div>
  </div>
</template>
<style scoped></style>
