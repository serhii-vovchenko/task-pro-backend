import { Schema, model } from 'mongoose';

const IconSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const IconsCollection = model('icons', IconSchema);
