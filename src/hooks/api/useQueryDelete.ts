import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/services/axios";

interface useQueryDeleteProps {
  url: `/${string}/${string}`;
  deleteParams?: { [key: string]: string | number };
}

export const useQueryDelete = <TResponse = any>({
  url,
  deleteParams,
}: useQueryDeleteProps) => {
  const mutation = useMutation<AxiosResponse<TResponse>, AxiosError>(() =>
    api.delete<TResponse>(url, {
      params: { ...deleteParams },
    })
  );

  return { ...mutation, queryDelete: mutation.mutate };
};
