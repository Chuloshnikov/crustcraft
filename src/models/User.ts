import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  image: String,
}, { timestamps: true });

export const User = models.User || mongoose.model<IUser>('User', UserSchema);