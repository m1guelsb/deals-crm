import { api } from "@/services/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface useGETProps<ResponseDataType> {
  onSuccess?(response: AxiosResponse<ResponseDataType>): void;
  onError?(err: AxiosError): void;
}
export const useGET = <ResponseDataType>({
  onSuccess,
  onError,
}: useGETProps<ResponseDataType>) => {
  const [response, setResponse] = useState<AxiosResponse<ResponseDataType>>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const GET = useCallback(
    async (url: string, configs?: AxiosRequestConfig) => {
      try {
        setLoading(true);
        setError(undefined);

        const response = await api.get<ResponseDataType>(url, configs);

        setResponse(response);
        onSuccess?.(response);
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        setError(err);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    },
    [onError, onSuccess]
  );

  return { response, error, loading, GET };
};
