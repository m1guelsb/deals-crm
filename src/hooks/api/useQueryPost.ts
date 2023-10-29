import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/services/axios";

interface usePostProps {
  url: string;
  params?: { [key: string]: string | number };
}

export const useQueryPost = <TPayload = any, TResponse = any>({
  url,
  params,
}: usePostProps) => {
  const mutation = useMutation<AxiosResponse<TResponse>, AxiosError, TPayload>(
    (payload: TPayload) =>
      api.post<TPayload, AxiosResponse<TResponse>>(url, payload, {
        params,
      })
  );

  return { ...mutation, post: mutation.mutate };
};
