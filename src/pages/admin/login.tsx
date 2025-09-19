// pages/admin/login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('❌ Invalid credentials');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded">
      <h1 className="text-xl mb-4">Admin Login</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2 w-full p-2 border rounded"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="mb-4 w-full p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
}
