export interface iTwaroom {
  _id: string;
  name: string;
  media_story_id: string;
  messages: iTwamessage[];
}
export interface iTwamessage {
  room_id: string;
  sender_user_id: string;
  message: string;
}

