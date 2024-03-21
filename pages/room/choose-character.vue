<template>
  <div
    class="flex flex-col mt-2 gap-2 max-h-[90vh] overflow-auto scrollbar-thin"
  >
    <div v-for="cha in characters">
      <CharacterChooser :character="cha" @choosed="choose(cha)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TwaroomService } from "~/main/Twaroom/TwaroomService";
import { TwaroomChooseCharacterService } from "~/main/Twaroom/TwaroomChooseCharacterService";
import CharacterChooser from "../../main/Movies/components/CharacterChooser.vue";
import { MoviesService } from "~/main/Movies/MoviesService";
import type { TmdbCastMember } from "../../main/Movies/interfaces";

const route = useRoute();
const router = useRouter();

const twaroomService = new TwaroomService();
const chooseCharacterService = new TwaroomChooseCharacterService();
const movieService = MoviesService();
const characters = ref<TmdbCastMember[]>([]);
onMounted(async () => {
  const movie_id = twaroomService.current_room.media_story_id;

  characters.value = await movieService.get_movie_characters(movie_id);
});
async function choose(character: TmdbCastMember) {
  const room = await chooseCharacterService.set_choosed_character(
    twaroomService.current_room._id,
    character
  );
  twaroomService.current_room = room;
  navigateTo(`/room/two/${room._id}`);
}
</script>

