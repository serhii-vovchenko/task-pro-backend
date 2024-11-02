import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      enum: ['dark', 'light', 'violet'],
      default: 'dark',
    },
    userId: {
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

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', userSchema);
