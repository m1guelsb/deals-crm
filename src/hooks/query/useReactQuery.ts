import { api } from "@/services/axios";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

interface useReactQueryProps {
  queryKey: string;
  url: string;
  requestConfigs?: AxiosRequestConfig<any> | undefined;
  queryConfigs?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  };
}

export function useReactQuery<ResponseDataType>({
  queryKey,
  url,
  requestConfigs,
  queryConfigs,
}: useReactQueryProps) {
  const queryResponse = useQuery(
    queryKey,
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
