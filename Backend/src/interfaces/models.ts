import { Document } from "mongoose";

export interface ISurvey extends Document {
  _id: string;
  userId: string;
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export interface IUser extends Document {
  _id: string;
  fullname: string;
  email: string;
  password: string;
}