import { api } from "@/services/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface prefetchProps {
  queryKeys: string[];
  url: string;
  reqParams?: { [key: string]: string | number };
  queryConfigs?: {
    staleTime?: number;
    enabled?: boolean;
  };
}
export const useQueryPrefetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isError, setIsError] = useState(false);
  const queryClient = useQueryClient();

  const prefetch = ({
    url,
    queryKeys,
    queryConfigs,
    reqParams,
  }: prefetchProps) => {
    setIsLoading(true);
    queryClient
      .prefetchQuery(
        queryKeys,
        async () => {
          const { data } = await api.get(url, { params: { ...reqParams } });
          return data;
        },
        {
          ...queryConfigs,
          retry: false,
        }
      )
      .then(() => setIsFetched(true))
      .catch((err) => setIsError(!!err))
      .finally(() => setIsLoading(false));
  };
  return { prefetch, isLoading, isError, isFetched };
};
