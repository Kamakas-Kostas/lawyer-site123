import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';

type Locale = 'el' | 'en' | 'de';

type Translation = {
  title: string;
  excerpt: string;
  content: string;
};

type Post = {
  _id: string;
  slug: string;
  date: string;
  translations: Partial<Record<Locale, Translation>>;
  enabledLanguages?: Locale[];
  isPublished?: boolean;
};

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch('/api/posts/' + id)
      .then((res) => res.json())
      .then((data: Post) => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (locale: Locale, field: keyof Translation, value: string) => {
    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        translations: {
          ...prev.translations,
          [locale]: {
            ...prev.translations?.[locale],
            [field]: value,
          },
        },
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !post) return;

    const res = await fetch('/api/posts/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      alert('✅ Post updated!');
      router.push('/admin/posts');
    } else {
      alert('❌ Failed to update');
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (!post) return <p className="mt-10 text-center">Post not found</p>;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <input
            type="text"
            value={post.slug}
            onChange={(e) => setPost({ ...post, slug: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            value={post.date?.substring(0, 10)}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          {(['el', 'en', 'de'] as Locale[]).map((loc) => (
            <div key={loc} className="border p-3 rounded">
              <h2 className="font-semibold mb-2">Translations ({loc.toUpperCase()})</h2>
              <input
                type="text"
                placeholder="Title"
                value={post.translations?.[loc]?.title || ''}
                onChange={(e) => handleChange(loc, 'title', e.target.value)}
                className="border px-3 py-1 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Excerpt"
                value={post.translations?.[loc]?.excerpt || ''}
                onChange={(e) => handleChange(loc, 'excerpt', e.target.value)}
                className="border px-3 py-1 rounded w-full mb-2"
              />
              <textarea
                placeholder="Content"
                value={post.translations?.[loc]?.content || ''}
                onChange={(e) => handleChange(loc, 'content', e.target.value)}
                className="border px-3 py-1 rounded w-full"
                rows={4}
              />
            </div>
          ))}

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </form>
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
