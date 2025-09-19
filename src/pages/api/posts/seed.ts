import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/db';

import Article from '../../../models/Article'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Disabled in production' })
  }
  await connectDB()
  await Article.deleteMany({})

  await Article.create([
    {
      slug: 'consumer-rights-basics',
      enabledLanguages: ['el', 'en', 'de'],
      translations: {
        el: {
          title: 'Βασικά Δικαιώματα Καταναλωτή',
          excerpt: 'Τι πρέπει να γνωρίζει κάθε καταναλωτής στην Ελλάδα.',
          content: 'Στο άρθρο αυτό αναλύουμε τα βασικά δικαιώματα καταναλωτή...'
        },
        en: {
          title: 'Consumer Rights Basics',
          excerpt: 'What every consumer should know in Greece.',
          content: 'In this post we explain core consumer rights...'
        },
        de: {
          title: 'Grundlagen der Verbraucherrechte',
          excerpt: 'Was jeder Verbraucher in Griechenland wissen sollte.',
          content: 'In diesem Beitrag erläutern wir grundlegende Verbraucherrechte...'
        }
      },
      date: new Date('2024-10-01'),
      isPublished: true
    },
    {
      slug: 'employment-termination-guide',
      enabledLanguages: ['el', 'en', 'de'],
      translations: {
        el: {
          title: 'Οδηγός Λύσης Σύμβασης Εργασίας',
          excerpt: 'Δικαιώματα εργαζομένων και εργοδοτών σε απολύσεις.',
          content: 'Παρουσιάζουμε το νομικό πλαίσιο για απολύσεις...'
        },
        en: {
          title: 'Employment Termination Guide',
          excerpt: 'Employees’ and employers’ rights on dismissals.',
          content: 'We outline the legal framework for dismissals...'
        },
        de: {
          title: 'Leitfaden zur Beendigung von Arbeitsverhältnissen',
          excerpt: 'Rechte von Arbeitnehmern und Arbeitgebern bei Kündigungen.',
          content: 'Wir skizzieren den rechtlichen Rahmen für Kündigungen...'
        }
      },
      date: new Date('2024-09-12'),
      isPublished: true
    }
  ])

  return res.status(201).json({ ok: true })
}
