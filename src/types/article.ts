export type Locale = 'el' | 'en' | 'de'

export interface ArticleTranslation {
  title: string
  excerpt: string
  content: string
}

export interface Article {
  _id?: string
  slug: string
  enabledLanguages: Locale[]
  translations: Partial<Record<Locale, ArticleTranslation>>
  date: string // ISO string
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
}
