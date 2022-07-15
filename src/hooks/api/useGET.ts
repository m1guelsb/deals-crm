import { api } from "@/services/axios";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface useGETProps {
  onSuccess?: () => void;
  onError?: () => void;
}
export const useGET = <ResponseDataType>({
  onError,
  onSuccess,
}: useGETProps) => {
  const [response, setResponse] = useState<
    AxiosResponse<ResponseDataType> | undefined
  >();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const GET = useCallback(
    (url: string, configs?: AxiosRequestConfig<any> | undefined) => {
      setLoading(true);
      api
        .get<ResponseDataType>(url, configs)
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

  return { response, error, loading, GET };
};
