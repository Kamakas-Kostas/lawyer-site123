import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import ArticleModel, { ArticleDoc } from '../../../../models/Article';

type Locale = 'el' | 'en' | 'de';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  const { slug } = req.query as { slug: string };
  const { locale = 'el' } = req.query as { locale?: Locale };

  const doc = await ArticleModel.findOne({ slug, isPublished: true }).lean<ArticleDoc | null>();
  if (!doc) return res.status(404).json({ error: 'Not found' });

  // ✅ χρησιμοποιούμε type-safe access
  const tr = doc.translations?.[locale || 'el'] ?? doc.translations?.el;

  return res.status(200).json({
    _id: String(doc._id),
    slug: doc.slug,
    date: doc.date.toISOString(),
    title: tr?.title || '',
    excerpt: tr?.excerpt || '',
    content: tr?.content || '',
  });
}
