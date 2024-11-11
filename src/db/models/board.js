import { model, Schema } from 'mongoose';
import { backgroundsBorderSchema } from './backgrounds.js';

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      name: {
        type: String,
        required: true,
      },
      iconUrl: {
        type: String,
        required: true,
      },
    },
    backgrounds: {
      type: backgroundsBorderSchema,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BoardsCollection = model('boards', BoardSchema);
