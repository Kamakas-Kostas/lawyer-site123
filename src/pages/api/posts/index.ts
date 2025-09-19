import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/db';

import ArticleModel, { ArticleDoc } from '../../../models/Article'

type Locale = 'el' | 'en' | 'de'

// Payload για create/update (ελαφρύς έλεγχος)
type ArticlePayload = {
  slug: string
  enabledLanguages?: Locale[]
  translations?: Partial<Record<Locale, { title: string; excerpt: string; content: string }>>
  date: string // ISO
  isPublished?: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  if (req.method === 'GET') {
    const { locale = 'el', published = 'true' } = req.query as { locale?: Locale; published?: 'true' | 'false' }
    const filter = published === 'false' ? {} : { isPublished: true }

    try {
      const docs = await ArticleModel.find(filter).sort({ date: -1 }).lean<ArticleDoc[]>()

      const list = docs
        .filter(d => d.enabledLanguages?.includes(locale || 'el'))
        .map(d => ({
          _id: String(d._id),
          slug: d.slug,
          date: d.date.toISOString(),
          isPublished: d.isPublished,
          title: d.translations?.[locale || 'el']?.title ?? d.translations?.el?.title ?? '',
          excerpt: d.translations?.[locale || 'el']?.excerpt ?? d.translations?.el?.excerpt ?? ''
        }))

      return res.status(200).json(list)
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch posts' })
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body as ArticlePayload

      if (!body.slug || !body.date) {
        return res.status(400).json({ error: 'Missing slug or date' })
      }

      const created = await ArticleModel.create({
        slug: body.slug,
        enabledLanguages: body.enabledLanguages?.length ? body.enabledLanguages : ['el'],
        translations: body.translations || {},
        date: new Date(body.date),
        isPublished: !!body.isPublished
      })

      return res.status(201).json({ _id: String(created._id) })
    } catch (e: any) {
      if (e?.code === 11000) return res.status(409).json({ error: 'Slug already exists' })
      return res.status(500).json({ error: 'Failed to create post' })
    }
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).end('Method Not Allowed')
}
