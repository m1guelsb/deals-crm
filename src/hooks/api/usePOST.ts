import { api } from "@/services/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface usePostProps<TResponse> {
  onSuccess?(response: TResponse): void;
  onError?(err: AxiosError): void;
}

export const usePost = <TPayload = any, TResponse = any>({
  onSuccess,
  onError,
}: usePostProps<TResponse>) => {
  const [response, setResponse] = useState<TResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const post = useCallback(
    async (url: string, payload: TPayload, configs?: AxiosRequestConfig) => {
      try {
        setLoading(true);
        setError(undefined);

        const { data } = await api.post<TResponse>(url, payload, configs);

        setResponse(data);
        onSuccess?.(data);
        return data;
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

  return { response, error, loading, post };
};
