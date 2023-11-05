<template>
  <div class="h-full w-full font-sans">
    <div
      class="root_div bg-cover bg-no-repeat bg-center absolute w-full h-full blur brightness-50"
    ></div>
    <div class="h-full my-2">
      <main class="flex justify-center items-center">
        <slot />
        <div class="flex justify-center items-center fixed bottom-10 w-full">
          <DaisyMenu />
        </div>
      </main>
    </div>
  </div>
</template>
<style scoped>
.root_div {
  /* background-image: url(https://wallpapers.com/images/featured/attack-on-titan-d29uvfsdlbyjvb3z.webp); */
}
.hm-text {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}
</style>
