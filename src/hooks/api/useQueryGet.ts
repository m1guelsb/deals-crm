import { api } from "@/services/axios";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { number } from "yup";

interface useReactQueryProps {
  queryKeys: string[];
  url: string;
  reqParams?: { [key: string]: string | number };
  queryConfigs?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  };
}

export function useQueryGet<ResponseDataType>({
  queryKeys,
  url,
  reqParams,
  queryConfigs,
}: useReactQueryProps) {
  const queryResponse = useQuery(
    queryKeys,
    async () => {
      const { data } = await api.get<ResponseDataType>(url, {
        params: { ...reqParams },
      });
      return data;
    },
    { retry: false, ...queryConfigs }
  );

  return queryResponse;
}
