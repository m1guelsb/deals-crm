import { stitchesGlobalStyles } from "@/styles/global.styles";
import { QueryProvider } from "@/contexts/QueryContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  stitchesGlobalStyles();

  return (
    <ToastProvider>
      <QueryProvider pageProps={pageProps}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryProvider>
    </ToastProvider>
  );
}

export default MyApp;
