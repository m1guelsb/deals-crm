import { api } from "@/services/axios";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

interface useReactQueryProps {
  queryKey: string;
  url: string;
  configs?: AxiosRequestConfig<any> | undefined;
  queryConfigs?: {
    enabled?: boolean;
  };
}

export function useReactQuery<ResponseDataType>({
  queryKey,
  url,
  configs,
  queryConfigs,
}: useReactQueryProps) {
  const queryResponse = useQuery(
    queryKey,
    async () => {
      const { data } = await api.get<ResponseDataType>(url, configs);
      return data;
    },
    queryConfigs
  );

  return queryResponse;
}
