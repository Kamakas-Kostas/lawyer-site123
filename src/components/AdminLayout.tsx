// src/components/AdminLayout.tsx
'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

type DecodedToken = {
  email: string;
  role: 'owner' | 'admin';
};

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const [userRole, setUserRole] = useState<'owner' | 'admin' | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserRole(decoded.role);
      setEmail(decoded.email);
    } catch {
      console.error('Invalid token');
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">⚖️ Admin Panel</h1>
          <p className="text-xs text-gray-600">
            {email} ({userRole})
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <nav className="bg-white border-b p-4 flex gap-4 text-sm font-medium">
        <Link href="/admin" className="hover:underline">
          📊 Dashboard
        </Link>
        <Link href="/admin/posts" className="hover:underline">
          📰 Άρθρα
        </Link>
        <Link href="/admin/create-post" className="hover:underline">
          ➕ Νέο Άρθρο
        </Link>
        {userRole === 'owner' && (
          <Link href="/admin/users" className="hover:underline text-blue-600">
            🔐 Διαχείριση Admins
          </Link>
        )}
      </nav>

      <main className="p-6 flex-1">{children}</main>
    </div>
  );
}
