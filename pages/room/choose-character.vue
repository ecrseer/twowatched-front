<template>
  <div
    class="flex flex-col mt-2 gap-2 max-h-[90vh] overflow-auto scrollbar-thin"
  >
    <div v-for="nn in 5">
      <CharacterChooser :character="characters[nn]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TwaroomService } from "~/main/Twaroom/TwaroomService";
import CharacterChooser from "../../main/Movies/components/CharacterChooser.vue";
import { MoviesService } from "~/main/Movies/MoviesService";

const route = useRoute();
const router = useRouter();

const twaroomService = new TwaroomService();
const movieService = MoviesService();
const characters = ref([]);
onMounted(async () => {
  const movie_id = twaroomService.current_room.media_story_id;

  // if (!movie_id) {
  //   router.go(-1);
  //   return;
  // }

  characters.value = await movieService.get_movie_characters(movie_id);
});
</script>

