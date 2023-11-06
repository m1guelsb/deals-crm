import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/services/axios";

interface useQueryPatchProps {
  url: `/${string}/${string}`;
  params?: { [key: string]: string | number };
}

export const useQueryPatch = <TPayload = any, TResponse = any>({
  url,
  params,
}: useQueryPatchProps) => {
  const mutation = useMutation<AxiosResponse<TResponse>, AxiosError, TPayload>(
    (payload: TPayload) =>
      api.patch<TPayload, AxiosResponse<TResponse>>(url, payload, {
        params,
      })
  );

  return { ...mutation, patch: mutation.mutate };
};
