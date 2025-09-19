// src/models/AdminUser.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface AdminUserDoc extends Document {
  email: string;
  password: string; // hashed
  role: 'owner' | 'admin';
  createdAt: Date;
}

const AdminUserSchema = new Schema<AdminUserDoc>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['owner', 'admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

export default models.AdminUser || model<AdminUserDoc>('AdminUser', AdminUserSchema);
