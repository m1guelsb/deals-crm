import type { AppProps } from "next/app";
import { stitchesGlobalStyles } from "@/styles/global.styles";
import { QueryProvider } from "@/contexts/QueryContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

function MyApp({ Component, pageProps }: AppProps) {
  stitchesGlobalStyles();

  return (
    <ToastProvider>
      <AuthProvider>
        <QueryProvider pageProps={pageProps}>
          <Component {...pageProps} />
        </QueryProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default MyApp;
