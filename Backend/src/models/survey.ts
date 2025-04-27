import mongoose, { Schema, Document } from "mongoose";

export interface ISurvey extends Document {
  _id: string;
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

const surveySchema: Schema = new Schema(
  {
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
);

const SurveyModel = mongoose.model<ISurvey>("Survey", surveySchema);

export default SurveyModel;