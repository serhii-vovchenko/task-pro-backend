import { model, Schema } from 'mongoose';

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ColumnsCollection = model('columns', columnSchema);
