import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const nav = useTranslations("nav");

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="sticky top-0 bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo left */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Athanasios E. Mpakas_Transparent-03.png"
              alt="Logo"
              width={140}
              height={140}
              priority
            />
          </Link>

          {/* Navigation right */}
          <nav className="flex items-center gap-8 text-lg md:text-xl font-semibold">
            <Link href="/" className="hover:text-yellow-600 transition whitespace-nowrap">
              {nav("home")}
            </Link>
            <Link href="/bio" className="hover:text-yellow-600 transition whitespace-nowrap">
              {nav("bio")}
            </Link>
            <Link href="/practice-areas" className="hover:text-yellow-600 transition whitespace-nowrap">
              {nav("practice")}
            </Link>
            <Link href="/posts" className="hover:text-yellow-600 transition whitespace-nowrap">
              {nav("posts")}
            </Link>
            <Link href="/contact" className="hover:text-yellow-600 transition whitespace-nowrap">
              {nav("contact")}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Αθανάσιος Ε. Μπάκας — All rights reserved.
      </footer>
    </div>
  );
}
