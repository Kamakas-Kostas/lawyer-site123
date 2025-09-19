import { useTranslations } from "next-intl";

export default function PracticeAreas() {
  const t = useTranslations("practice");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>{t("area1")}</li>
        <li>{t("area2")}</li>
        <li>{t("area3")}</li>
        <li>{t("area4")}</li>
      </ul>
    </div>
  );
}
