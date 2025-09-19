import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import connectDB from '@/lib/db';
import ArticleModel, { ArticleDoc } from '../../models/Article';

type Locale = 'el' | 'en' | 'de';
type Props =
  | {
      ok: true;
      post: {
        slug: string;
        date: string;
        title: string;
        excerpt: string;
        content: string;
      };
    }
  | { ok: false };

export default function PostPage(props: Props) {
  const { locale = 'el' } = useRouter();
  const t = useTranslations('posts');

  if (!props.ok) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold">{t('notFound')}</h1>
      </div>
    );
  }

  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' });
  const { post } = props;

  return (
    <article className="max-w-3xl mx-auto py-10 px-4 prose prose-neutral">
      <h1 className="mb-2">{post.title}</h1>
      <time className="text-sm text-gray-500">
        {fmt.format(new Date(post.date))}
      </time>
      <p className="lead mt-4">{post.excerpt}</p>
      <hr className="my-6" />
      <p>{post.content}</p>
    </article>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { slug } = ctx.params as { slug: string };
  const locale = (ctx.locale || 'el') as Locale;

  await connectDB();
  const doc = await ArticleModel.findOne({ slug, isPublished: true }).lean<ArticleDoc | null>();
  if (!doc) return { props: { ok: false } };

  // ✅ type-safe πρόσβαση χωρίς any
  const tr =
    doc.translations?.[locale] ??
    doc.translations?.el ??
    { title: '', excerpt: '', content: '' };

  return {
    props: {
      ok: true,
      post: {
        slug: doc.slug,
        date: doc.date.toISOString(),
        title: tr.title || '',
        excerpt: tr.excerpt || '',
        content: tr.content || '',
      },
    },
  };
};
