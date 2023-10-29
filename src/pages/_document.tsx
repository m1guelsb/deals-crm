import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "@/styles/stitches.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          name="description"
          content="Customer Relationship Management platform where you can manage customers, earnings, deals and tasks."
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Deals CRM" />
        <meta property="og:title" content="Deals CRM" />
        <meta
          property="og:description"
          content="Customer Relationship Management platform where you can manage customers, earnings, deals and tasks."
        />
        <meta property="og:image" content="/cover.png" />

        {/* stitches ssr config */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />

        {/* fonts preload */}
        <link
          rel="preload"
          href="/fonts/Poppins-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Poppins-Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Poppins-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
