import { ReactNode, useState } from "react";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

interface QueryProviderProps {
  children: ReactNode;
  pageProps: any;
}

export function QueryProvider({ children, pageProps }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  //where children === rest of the app
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {children}

        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

