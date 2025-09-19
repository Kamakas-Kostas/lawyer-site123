import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import connectDB from '@/lib/db';

import ArticleModel, { ArticleDoc } from '../../../models/Article'

type Locale = 'el' | 'en' | 'de'

type PatchPayload = Partial<{
  slug: string
  enabledLanguages: Locale[]
  translations: Partial<
    Record<Locale, { title: string; excerpt: string; content: string }>
  >
  date: string
  isPublished: boolean
}>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB()
    const { id } = req.query as { id: string }

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid id' })
    }

    // 🔹 GET (fetch single post)
    if (req.method === 'GET') {
      const doc = await ArticleModel.findById(id).lean<ArticleDoc | null>()
      if (!doc) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json({ ...doc, _id: String(doc._id) })
    }

    // 🔹 PUT (update post fields)
    if (req.method === 'PUT') {
      const body = req.body as PatchPayload
      const update: any = {}

      if (typeof body.slug === 'string') update.slug = body.slug
      if (Array.isArray(body.enabledLanguages))
        update.enabledLanguages = body.enabledLanguages
      if (body.translations) update.translations = body.translations
      if (body.date) update.date = new Date(body.date)
      if (typeof body.isPublished === 'boolean')
        update.isPublished = body.isPublished

      const updated = await ArticleModel.findByIdAndUpdate(id, update, {
        new: true,
        lean: true,
      })

      if (!updated) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json({ ...updated, _id: String(updated._id) })
    }

    // 🔹 DELETE (remove post)
    if (req.method === 'DELETE') {
      await ArticleModel.findByIdAndDelete(id)
      return res.status(204).end()
    }

    res.setHeader('Allow', 'GET, PUT, DELETE')
    return res.status(405).end('Method Not Allowed')
  } catch (err: any) {
    console.error('❌ API Error:', err.message)
    return res.status(500).json({ error: 'Server error' })
  }
}
