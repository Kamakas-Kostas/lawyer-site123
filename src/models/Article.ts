import { Schema, model, models, InferSchemaType, Types, Model } from 'mongoose'

const TranslationSchema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }
  },
  { _id: false }
)

const ArticleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    enabledLanguages: {
      type: [String],
      enum: ['el', 'en', 'de'],
      required: true,
      default: ['el']
    },
    translations: {
      el: { type: TranslationSchema, required: false },
      en: { type: TranslationSchema, required: false },
      de: { type: TranslationSchema, required: false }
    },
    date: { type: Date, required: true },
    isPublished: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
)

export type ArticleDoc = InferSchemaType<typeof ArticleSchema> & {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ArticleModel: Model<ArticleDoc> =
  (models.Article as Model<ArticleDoc>) || model<ArticleDoc>('Article', ArticleSchema)

export default ArticleModel
