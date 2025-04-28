import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/models";

const userSchema: Schema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;