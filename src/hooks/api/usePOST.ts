import { api } from "@/services/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface usePOSTProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const usePOST = <ResponseDataType>({
  onSuccess,
  onError,
}: usePOSTProps = {}) => {
  const [response, setResponse] = useState<
    AxiosResponse<ResponseDataType> | undefined
  >();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const POST = useCallback(
    (url: string, data: any, configs?: AxiosRequestConfig<any> | undefined) => {
      setLoading(true);
      api
        .post(url, data, configs)
        .then((response) => {
          setResponse(response);
          if (onSuccess) onSuccess();
        })
        .catch((error) => {
          setError(error);
          if (onError) onError();
        })
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { response, error, loading, POST };
};
