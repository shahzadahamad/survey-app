import mongoose, { Schema } from "mongoose";
import { ISurvey } from "../interfaces/models";

const surveySchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SurveyModel = mongoose.model<ISurvey>("Survey", surveySchema);

export default SurveyModel;