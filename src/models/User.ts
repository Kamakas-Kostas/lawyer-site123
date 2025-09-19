// src/models/User.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface UserDoc extends Document {
  email: string;
  password: string; // hashed
  role: 'owner' | 'admin' | 'editor';
  createdAt: Date;
}

const UserSchema = new Schema<UserDoc>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['owner', 'admin', 'editor'], default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model<UserDoc>('User', UserSchema);
