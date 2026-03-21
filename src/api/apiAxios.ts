import axiosClient from './axiosClient';

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];

interface ApiOptions {
  method?: HttpMethod;
  data?: any;
  params?: Record<string, any>;
}

export async function apiAxios<T>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> {
  const { method = HttpMethod.GET, data, params } = options || {};

  let res = await axiosClient.request<T>({
    url: endpoint,
    method,
    data,
    params,
  });

  

  return res.data;
}