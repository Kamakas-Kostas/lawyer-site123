import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

type PracticeKey = "area1" | "area2" | "area3" | "area4";
type PracticeDescKey = "area1Desc" | "area2Desc" | "area3Desc" | "area4Desc";

export default function HomePage() {
  const t = useTranslations("home");
  const practice = useTranslations("practice");
  const contact = useTranslations("contact");

  const practiceAreas: PracticeKey[] = ["area1", "area2", "area3", "area4"];

  return (
    <div className="bg-white text-gray-900">
      {/* HERO */}
      <section
        className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-law.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            {t("heroSubtitle")}
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 px-6 py-3 bg-yellow-600 text-white rounded shadow hover:bg-yellow-700 transition"
          >
            {contact("title")}
          </Link>
        </motion.div>
      </section>

      {/* BIO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto py-20 px-6 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">{t("bioTitle")}</h2>
        <p className="text-gray-600 leading-relaxed">{t("bioText")}</p>
      </motion.section>

      {/* PRACTICE AREAS */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-50 py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {practice("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {practiceAreas.map((key) => {
              const descKey = `${key}Desc` as PracticeDescKey;
              return (
                <motion.div
                  key={key}
                  whileHover={{
                    y: -5,
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
                  }}
                  className="bg-white p-6 rounded-lg border transition"
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {practice(key)}
                  </h3>
                  <p className="text-gray-600 text-sm">{practice(descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* CONTACT (info + map + button) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto py-20 px-6"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          {contact("title")}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {contact("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.8512895934093!2d22.414!3d39.639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a76d9b8bb2c68d%3A0xb1a91ff6e71ebf47!2sGounari%2021%2C%20Larisa%20412%2021!5e0!3m2!1sel!2sgr!4v1695045600000!5m2!1sel!2sgr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="space-y-4 text-lg">
            <p>📍 {contact("address")}</p>
            <p>
              📧{" "}
              <a
                href={`mailto:${contact("email")}`}
                className="text-yellow-600 hover:underline"
              >
                {contact("email")}
              </a>
            </p>
            <p>
              📞{" "}
              <a
                href={`tel:${contact("phone")}`}
                className="text-yellow-600 hover:underline"
              >
                {contact("phone")}
              </a>
            </p>

            <Link
              href="/contact"
              className="inline-block mt-4 px-6 py-2 bg-yellow-600 text-white rounded shadow hover:bg-yellow-700 transition"
            >
              {contact("button")}
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
