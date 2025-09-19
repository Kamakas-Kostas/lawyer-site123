// pages/admin/posts.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';

type Item = {
  _id: string;
  slug: string;
  date: string;
  isPublished: boolean;
  title: string;
};

export default function AdminPosts() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts?locale=el')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const handleTogglePublish = async (id: string, currentValue: boolean) => {
    const res = await fetch('/api/posts/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublished: !currentValue }),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isPublished: !currentValue } : p
        )
      );
    } else {
      alert('❌ Failed to update publish state');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Manage Posts</h1>

        <div className="mb-6">
          <Link
            href="/admin/create-post"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ➕ New Post
          </Link>
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2 text-left">Title</th>
              <th className="border px-3 py-2">Slug</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Published</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((post) => (
              <tr key={post._id}>
                <td className="border px-3 py-2">{post.title}</td>
                <td className="border px-3 py-2">{post.slug}</td>
                <td className="border px-3 py-2">
                  {new Date(post.date).toLocaleDateString()}
                </td>
                <td className="border px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={post.isPublished}
                    onChange={() =>
                      handleTogglePublish(post._id, post.isPublished)
                    }
                  />
                </td>
                <td className="border px-3 py-2 flex gap-2">
                  <Link
                    href={`/admin/edit-post/${post._id}`}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (!confirm('Delete this post?')) return;
                      fetch('/api/posts/' + post._id, { method: 'DELETE' }).then(
                        (res) => {
                          if (res.ok) {
                            setItems((prev) =>
                              prev.filter((x) => x._id !== post._id)
                            );
                          }
                        }
                      );
                    }}
                    className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
