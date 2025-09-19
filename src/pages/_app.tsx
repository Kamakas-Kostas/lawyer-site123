import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { IntlProvider } from "next-intl";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import "../styles/globals.css";

type Messages = Record<string, unknown>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const { locale = "el" } = useRouter();
  const messages = (pageProps as { messages?: Messages }).messages || {};

  // Debug (μία φορά στον client)
  if (typeof window !== "undefined") {
    console.log(
      "[IntlProvider] locale:",
      locale,
      "hasMessages?",
      !!messages && Object.keys(messages).length > 0
    );
  }

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </IntlProvider>
  );
}

MyApp.getInitialProps = async (appCtx: AppContext) => {
  const appProps = await App.getInitialProps(appCtx);
  const locale: string = appCtx.ctx.locale || "el";

  let messages: Messages | undefined = (appProps.pageProps as { messages?: Messages }).messages;
  if (!messages) {
    try {
      const mod = await import(`../locales/${locale}.json`);
      messages = mod.default;
    } catch {
      const fallback = await import(`../locales/el.json`);
      messages = fallback.default;
    }
  }

  return {
    ...appProps,
    pageProps: {
      ...(appProps.pageProps || {}),
      messages,
    },
  };
};
