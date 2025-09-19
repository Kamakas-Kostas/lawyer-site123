import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import Article from '../../models/Article';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectDB();
    console.log('✅ Connected to DB:', db.connection.name);

    const articles = await Article.find().limit(5);
    res.status(200).json({
      db: db.connection.name,
      articlesCount: articles.length,
      articles,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      console.error('Unknown error', err);
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
