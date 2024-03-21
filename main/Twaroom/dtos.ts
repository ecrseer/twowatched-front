import type { TmdbCastMember } from "../Movies/interfaces";

type iUserId = string;
export interface iTwaroom {
  _id: string;
  name: string;
  media_story_id: string;
  messages: iTwamessage[];
  usersCharacters: Record<iUserId, TmdbCastMember>;
}
export interface iTwamessage {
  room_id: string;
  sender_user_id: string;
  content: string;
}

