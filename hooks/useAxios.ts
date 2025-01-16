import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface UseAxiosOptions extends Omit<AxiosRequestConfig, "url" | "method"> {
  url: string;
  method: HttpMethod;
}

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  fetch: (options: UseAxiosOptions) => Promise<AxiosResponse<T>>;
}

function useAxios<T = any>(): UseAxiosResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetch = async (options: UseAxiosOptions): Promise<AxiosResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios({
        ...options,
      });
      setData(response.data);
      setLoading(false);
      return response;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError);
      setData(null);
      setLoading(false);
      throw axiosError;
    }
  };

  return { data, loading, error, fetch };
}

export default useAxios;
