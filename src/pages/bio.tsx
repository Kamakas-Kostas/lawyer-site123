// src/pages/bio.tsx
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BioPage() {
  const t = useTranslations("bio");

  return (
    <div className="bg-white text-gray-900">
      {/* HERO */}
      <section className="relative h-72 flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-800 text-white text-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t("name")}</h1>
          <p className="text-lg">{t("title")}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Work Experience */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold border-b-2 border-yellow-600 mb-6">
            {t("work.title")}
          </h2>
          <ul className="space-y-4">
            <li>
              <p className="font-semibold">{t("work.exp1.period")}</p>
              <p>{t("work.exp1.desc")}</p>
            </li>
            <li>
              <p className="font-semibold">{t("work.exp2.period")}</p>
              <p>{t("work.exp2.desc")}</p>
            </li>
          </ul>
        </motion.section>

        {/* Studies */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold border-b-2 border-yellow-600 mb-6">
            {t("studies.title")}
          </h2>
          <ul className="space-y-4">
            <li>
              <p className="font-semibold">{t("studies.study1.period")}</p>
              <p>{t("studies.study1.desc")}</p>
            </li>
            <li>
              <p className="font-semibold">{t("studies.study2.period")}</p>
              <p>{t("studies.study2.desc")}</p>
            </li>
            <li>
              <p className="font-semibold">{t("studies.study3.period")}</p>
              <p>{t("studies.study3.desc")}</p>
            </li>
          </ul>
        </motion.section>

        {/* Research Interests */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold border-b-2 border-yellow-600 mb-6">
            {t("research.title")}
          </h2>
          <p className="text-gray-700 leading-relaxed">{t("research.text")}</p>
        </motion.section>

        {/* Publications */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold border-b-2 border-yellow-600 mb-6">
            {t("publications.title")}
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a
                href="https://www.efsyn.gr/nisides/457588_dikaiosyni-kai-tehniti-noimosyni-ston-fako-tis-epieikeias"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:underline"
              >
                {t("publications.pub1")}
              </a>
            </li>
          </ul>
        </motion.section>

        {/* Languages */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold border-b-2 border-yellow-600 mb-6">
            {t("languages.title")}
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>{t("languages.el")}</li>
            <li>{t("languages.en")}</li>
            <li>{t("languages.de")}</li>
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
