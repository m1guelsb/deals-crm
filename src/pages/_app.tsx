import type { AppProps } from "next/app";
import { stitchesGlobalStyles } from "@/stitches.config";
import { QueryProvider } from "@/contexts/QueryContext";
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  stitchesGlobalStyles();

  return (
    <AuthProvider>
      <QueryProvider pageProps={pageProps}>
        <Component {...pageProps} />
      </QueryProvider>
    </AuthProvider>
  );
}

export default MyApp;
