import { Schema, model } from 'mongoose';

const backgraundsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    modalUrl: {
      type: String,
      required: true,
    },
    resolution: {
      mobile: {
        type: String,
        required: true,
      },
      tablet: {
        type: String,
        required: true,
      },
      desktop: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BackgroundCollection = model('backgrounds', backgraundsSchema);
