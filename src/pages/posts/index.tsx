import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import connectDB from "@/lib/db";
import ArticleModel, { ArticleDoc } from "@/models/Article";

type Locale = "el" | "en" | "de";
type Item = {
  _id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
};

export default function PostsIndex({ items }: { items: Item[] }) {
  const { locale = "el" } = useRouter();
  const t = useTranslations("posts");
  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-gray-600 mb-8">{t("description")}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((p) => (
          <article
            key={p._id}
            className="border rounded-md p-4 hover:shadow-sm transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/posts/${p.slug}`} locale={locale}>
                {p.title}
              </Link>
            </h2>
            <time className="text-xs text-gray-500">
              {fmt.format(new Date(p.date))}
            </time>
            <p className="mt-3 text-gray-700">{p.excerpt}</p>
            <div className="mt-4">
              <Link
                href={`/posts/${p.slug}`}
                locale={locale}
                className="text-blue-600 hover:underline"
              >
                {t("readMore")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const locale = (ctx.locale || "el") as Locale;
  await connectDB();
  const docs = await ArticleModel.find({ isPublished: true })
    .sort({ date: -1 })
    .lean<ArticleDoc[]>();

  const items: Item[] = docs
    .filter((d) => d.enabledLanguages?.includes(locale))
    .map((d) => ({
      _id: String(d._id),
      slug: d.slug,
      date: d.date.toISOString(),
      title:
        d.translations?.[locale]?.title ||
        d.translations?.el?.title ||
        "—",
      excerpt:
        d.translations?.[locale]?.excerpt ||
        d.translations?.el?.excerpt ||
        "",
    }));

  return { props: { items } };
};
