import { Schema, model } from "mongoose";
import { IUser } from "./User";

export interface IMessage {
  role: "user" | "assistant";
  content: string;
}

export interface IConversation {
  _id?: string;
  title: string;
  messages: IMessage[];
  user: IUser;
}

const conversationSchema = new Schema<IConversation>({
  title: { type: String, required: true },
  messages: [{ role: String, content: String }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Conversation = model<IConversation>(
  "Conversation",
  conversationSchema
);
