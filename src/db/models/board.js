import { model, Schema } from 'mongoose';

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
    background: {
      name: String,
      backgroundUrl: String,
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
