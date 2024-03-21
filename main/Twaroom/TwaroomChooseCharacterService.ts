import type { TmdbCastMember } from "../Movies/interfaces";
import { UserService } from "../User/UserService";

export class TwaroomChooseCharacterService {
  public async set_choosed_character(
    chat_room_id: string,
    cast_member: TmdbCastMember
  ) {
    const config = useRuntimeConfig();

    const chat_room = await $fetch<any>(
      `${
        config.public.BACKEND_URI
      }/twaroom/choosed-character/${chat_room_id}/${UserService.getTabUserId()}`,
      {
        method: "POST",
        body: cast_member,
      }
    );
    return chat_room;
  }
}

