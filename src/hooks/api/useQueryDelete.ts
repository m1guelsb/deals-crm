import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/services/axios";

interface useQueryDeleteProps {
  url: `/${string}/${string}`;
  params?: { [key: string]: string | number };
}

export const useQueryDelete = <TResponse = any>({
  url,
  params,
}: useQueryDeleteProps) => {
  const mutation = useMutation<AxiosResponse<TResponse>, AxiosError>(() =>
    api.delete<TResponse>(url, {
      params,
    })
  );

  return { ...mutation, queryDelete: mutation.mutate };
};
