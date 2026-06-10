import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  mail: string;
  phone: string;
  gender: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model<IUser>('User', UserSchema);
