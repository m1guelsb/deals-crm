import { api } from "@/services/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface usePostProps<Response> {
  onSuccess?(response: Response): void;
  onError?(err: AxiosError): void;
}

export const usePost = <Response, Payload = any>({
  onSuccess,
  onError,
}: usePostProps<Response>) => {
  const [response, setResponse] = useState<Response>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const post = useCallback(
    async (url: string, payload: Payload, configs?: AxiosRequestConfig) => {
      try {
        setLoading(true);
        setError(undefined);

        const { data } = await api.post<Response>(url, payload, configs);

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
