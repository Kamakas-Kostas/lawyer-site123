// scripts/seedAdmin.ts
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import AdminUser from '@/models/AdminUser';

async function seed() {
  await dbConnect();

  const existing = await AdminUser.findOne({ email: 'you@example.com' });
  if (existing) {
    console.log('Admin already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('StrongPass123', 12);

  await AdminUser.create({
    email: 'you@example.com',
    password: hashedPassword,
    role: 'owner',
  });

  console.log('✅ Admin user created');
}

seed();
