// src/lib/posts.ts
type Locale = 'el' | 'en' | 'de'

export type Post = {
  slug: string
  date: string // ISO
  translations: Record<Locale, { title: string; excerpt: string; content: string }>
}

export const posts: Post[] = [
  {
    slug: 'consumer-rights-basics',
    date: '2024-10-01',
    translations: {
      el: {
        title: 'Βασικά Δικαιώματα Καταναλωτή',
        excerpt: 'Τι πρέπει να γνωρίζει κάθε καταναλωτής στην Ελλάδα.',
        content:
          'Στο άρθρο αυτό αναλύουμε τα βασικά δικαιώματα καταναλωτή, τις εγγυήσεις, τις επιστροφές και τα βήματα καταγγελίας...'
      },
      en: {
        title: 'Consumer Rights Basics',
        excerpt: 'What every consumer should know in Greece.',
        content:
          'In this post we explain core consumer rights, warranties, returns and complaint steps...'
      },
      de: {
        title: 'Grundlagen der Verbraucherrechte',
        excerpt: 'Was jeder Verbraucher in Griechenland wissen sollte.',
        content:
          'In diesem Beitrag erläutern wir grundlegende Verbraucherrechte, Garantien, Rückgaben und Beschwerdewege...'
      }
    }
  },
  {
    slug: 'employment-termination-guide',
    date: '2024-09-12',
    translations: {
      el: {
        title: 'Οδηγός Λύσης Σύμβασης Εργασίας',
        excerpt: 'Δικαιώματα εργαζομένων και εργοδοτών σε απολύσεις.',
        content:
          'Παρουσιάζουμε το νομικό πλαίσιο για απολύσεις, αποζημιώσεις, προειδοποίηση και πρακτικές συμβουλές...'
      },
      en: {
        title: 'Employment Termination Guide',
        excerpt: 'Employees’ and employers’ rights on dismissals.',
        content:
          'We outline the legal framework for dismissals, severance, notice and practical tips...'
      },
      de: {
        title: 'Leitfaden zur Beendigung von Arbeitsverhältnissen',
        excerpt: 'Rechte von Arbeitnehmern und Arbeitgebern bei Kündigungen.',
        content:
          'Wir skizzieren den rechtlichen Rahmen für Kündigungen, Abfindungen, Fristen und praktische Hinweise...'
      }
    }
  }
]

// helpers
export function getPostsForLocale(locale: Locale) {
  return posts.filter(p => p.translations[locale])
}

export function getPostBySlug(slug: string) {
  return posts.find(p => p.slug === slug) || null
}

export function getAllSlugs() {
  return posts.map(p => p.slug)
}
