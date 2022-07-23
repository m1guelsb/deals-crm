import { api } from "@/services/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface usePOSTProps<ResponseDataType> {
  onSuccess?(response: AxiosResponse<ResponseDataType>): void;
  onError?(err: AxiosError): void;
}

export const usePOST = <ResponseDataType, PayloadDataType = any>({
  onSuccess,
  onError,
}: usePOSTProps<ResponseDataType>) => {
  const [response, setResponse] = useState<AxiosResponse<ResponseDataType>>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const POST = useCallback(
    async (
      url: string,
      data: PayloadDataType,
      configs?: AxiosRequestConfig
    ) => {
      try {
        setLoading(true);
        setError(undefined);

        const response = await api.post<ResponseDataType>(url, data, configs);

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

  return { response, error, loading, POST };
};
