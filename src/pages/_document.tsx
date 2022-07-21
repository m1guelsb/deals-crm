import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "@/styles/stitches.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="description" content="Talk to who you want!" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

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

        {/* fontface definition */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Poppins';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: url('/fonts/Poppins-Regular.ttf') format('ttf');
              }
              
              @font-face {
                font-family: 'Poppins';
                font-style: normal;
                font-display: swap;
                font-weight: 500;
                src: url('/fonts/Poppins-Medium.ttf') format('ttf');
              }
              
              @font-face {
                font-family: 'Poppins';
                font-style: normal;
                font-display: swap;
                font-weight: 700;
                src: url('/fonts/Poppins-Bold.ttf') format('ttf'); 
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
