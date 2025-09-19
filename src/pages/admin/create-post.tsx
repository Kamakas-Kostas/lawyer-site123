// pages/admin/create-post.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';

type Locale = 'el' | 'en' | 'de';

export default function CreatePost() {
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [translations, setTranslations] = useState<Record<Locale, any>>({
    el: { title: '', excerpt: '', content: '' },
    en: { title: '', excerpt: '', content: '' },
    de: { title: '', excerpt: '', content: '' }
  });

  const router = useRouter();

  const handleChange = (locale: Locale, field: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [field]: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug,
        date,
        isPublished,
        enabledLanguages: ['el', 'en', 'de'],
        translations
      })
    });
    if (res.ok) {
      alert('✅ Post created!');
      router.push('/admin/posts');
    } else {
      const err = await res.json();
      alert('❌ Error: ' + err.error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            Published
          </label>

          {(['el', 'en', 'de'] as Locale[]).map((loc) => (
            <div key={loc} className="border p-3 rounded">
              <h2 className="font-semibold mb-2">Translations ({loc.toUpperCase()})</h2>
              <input
                type="text"
                placeholder="Title"
                value={translations[loc].title}
                onChange={(e) => handleChange(loc, 'title', e.target.value)}
                className="border px-3 py-1 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Excerpt"
                value={translations[loc].excerpt}
                onChange={(e) => handleChange(loc, 'excerpt', e.target.value)}
                className="border px-3 py-1 rounded w-full mb-2"
              />
              <textarea
                placeholder="Content"
                value={translations[loc].content}
                onChange={(e) => handleChange(loc, 'content', e.target.value)}
                className="border px-3 py-1 rounded w-full"
                rows={4}
              />
            </div>
          ))}

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Save Post
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
