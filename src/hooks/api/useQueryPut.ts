import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/services/axios";

interface usePostProps {
  url: string;
  putParams?: { [key: string]: string | number };
}

export const useQueryPut = <TPayload = any, TResponse = any>({
  url,
  putParams,
}: usePostProps) => {
  const mutation = useMutation<AxiosResponse<TResponse>, AxiosError, TPayload>(
    (payload: TPayload) =>
      api.put<TPayload, AxiosResponse<TResponse>>(url, payload, {
        params: { ...putParams },
      })
  );

  return { ...mutation, put: mutation.mutate };
};
