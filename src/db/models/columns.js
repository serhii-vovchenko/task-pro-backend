import mongoose, { model, Schema } from 'mongoose';

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      default: function () {
        return this._id;
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ColumnsCollection = model('columns', columnSchema);
