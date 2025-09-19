// pages/admin/index.tsx
import AdminLayout from '@/components/AdminLayout';
import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul className="list-disc ml-6">
        <li>
          <Link href="/admin/create-post" className="text-blue-600 underline">
            ➕ Create New Post
          </Link>
        </li>
      </ul>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auth_token } = nookies.get(ctx);

  if (!auth_token) {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  try {
    jwt.verify(auth_token, process.env.JWT_SECRET!);
    return { props: {} };
  } catch {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }
};
