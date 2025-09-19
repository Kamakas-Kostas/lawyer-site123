"use client";

import { useRouter } from "next/router";
import Link from "next/link";

const locales = [
  { code: "el", label: "🇬🇷 EL" },
  { code: "en", label: "🇬🇧 EN" },
  { code: "de", label: "🇩🇪 DE" }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  return (
    <div className="flex gap-2 items-center">
      {locales.map((lng) => (
        <Link
          key={lng.code}
          href={{ pathname, query }}
          as={asPath}
          locale={lng.code}
          className={`px-2 py-1 rounded text-sm font-medium transition ${
            locale === lng.code
              ? "bg-yellow-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {lng.label}
        </Link>
      ))}
    </div>
  );
}
