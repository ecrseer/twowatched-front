<template>
  <div class="flex flex-col h-full justify-between items-stretch">
    <div class="text-3xl">{{ searching }}</div>
    <div class="flex flex-col items-center">
      <MuiList />
    </div>
    <div class="mb-12 mx-12">
      <MuiInput v-model="searching" :label="'searching'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: "",
  title: "twowatch",
});

const searching = ref("");
watch(searching, (movie) => {
  console.log("🚀 ~ watch ~ movie:", movie);
  const base_url = "https://api.themoviedb.org/3/search/multi";
  // const url =
  //   "https://api.themoviedb.org/3/search/multi?query=fsf&include_adult=false&language=en-US&page=1";

  useFetch(base_url, {
    method: "get",
    headers: {
      accept: "application/json",
    },
    query: {
      query: movie,
      include_adult: true,
      language: "en-US",
      page: 1,
      api_key: "146ddf71a6ccbd46651d641ac6e65517",
    },
  }).then((data) => {
    console.log("🚀 ~ watch ~ data:", data.data);
  });
});
</script>
