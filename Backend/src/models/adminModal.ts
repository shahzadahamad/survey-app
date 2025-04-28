import mongoose, { Schema } from "mongoose";
import { IAdmin } from "../interfaces/models";

const adminSchema: Schema = new Schema(
  {
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

const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);

export default AdminModel;