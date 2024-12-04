import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  hashedPassword: Buffer;
  salt: Buffer;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hashedPassword: { type: Buffer, required: true },
  salt: { type: Buffer, required: true },
});

export const User = model<IUser>("User", userSchema);
