import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "@/services/axios";

interface useQueryPostProps {
  url: `/${string}`;
  mutationKey?: Array<string | number>;
}

interface Request<T> {
  data: T;
  params?: AxiosRequestConfig;
}

export const useQueryPost = <Payload = any, Response = any>({
  url,
  mutationKey,
}: useQueryPostProps) => {
  const mutation = useMutation<
    AxiosResponse<Response>,
    AxiosError,
    Request<Payload>
  >({
    mutationFn: ({ data, params }) => api.post(url, data, params),
    mutationKey,
    retry: false,
  });

  return { ...mutation, post: mutation.mutate };
};
