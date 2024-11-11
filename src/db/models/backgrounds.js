import { Schema, model } from 'mongoose';

const backgroundsSchema = new Schema({
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
});

export const backgroundsBorderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        'bg-0',
        'bg-1',
        'bg-2',
        'bg-3',
        'bg-4',
        'bg-5',
        'bg-6',
        'bg-7',
        'bg-8',
        'bg-9',
        'bg-10',
        'bg-11',
        'bg-12',
        'bg-13',
        'bg-14',
        'bg-15',
      ],
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
  { _id: false },
);

export const BackgroundCollection = model('backgrounds', backgroundsSchema);
