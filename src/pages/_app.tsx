import type { AppProps } from "next/app";
import { stitchesGlobalStyles } from "@/stitches.config";
import { QueryProvider } from "@/contexts/QueryContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

function MyApp({ Component, pageProps }: AppProps) {
  stitchesGlobalStyles();

  return (
    <AuthProvider>
      <QueryProvider pageProps={pageProps}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </QueryProvider>
    </AuthProvider>
  );
}

export default MyApp;
