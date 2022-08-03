import { api } from "@/services/axios";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface useReactQueryProps {
  queryKeys: string[];
  url: string;
  requestConfigs?: AxiosRequestConfig<any> | undefined;
  queryConfigs?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  };
}

export function useReactQuery<ResponseDataType>({
  queryKeys,
  url,
  requestConfigs,
  queryConfigs,
}: useReactQueryProps) {
  const queryResponse = useQuery(
    queryKeys,
    async () => {
      const { data } = await api.get<ResponseDataType>(url, {
        ...requestConfigs,
      });
      return data;
    },
    { retry: false, ...queryConfigs }
  );

  return queryResponse;
}
