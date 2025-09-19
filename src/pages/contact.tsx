import { useTranslations } from "next-intl";

export default function ContactPage() {
  const contact = useTranslations("contact");

  return (
    <div className="bg-white text-gray-900">
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold text-center mb-6">
          {contact("title")}
        </h1>
        <p className="text-center text-gray-500 mb-12">
          {contact("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="space-y-4 bg-gray-50 p-6 rounded-lg shadow">
            <input
              type="text"
              placeholder={contact("form.name")}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-yellow-400"
            />
            <input
              type="email"
              placeholder={contact("form.email")}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-yellow-400"
            />
            <textarea
              placeholder={contact("form.message")}
              rows={5}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
            >
              {contact("form.submit")}
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-4 text-lg">
            <p>📍 Γούναρη 21, Λάρισα 41221</p>
            <p>
              📧{" "}
              <a
                href="mailto:thanasismpakas@yahoo.com"
                className="text-yellow-600 hover:underline"
              >
                thanasismpakas@yahoo.com
              </a>
            </p>
            <p>
              📞{" "}
              <a
                href="tel:+306987790165"
                className="text-yellow-600 hover:underline"
              >
                6987790165
              </a>
            </p>

            {/* Google Map */}
            <div className="rounded-lg overflow-hidden shadow-lg h-64 mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
