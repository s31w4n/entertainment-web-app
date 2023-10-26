import { useState, useEffect, useCallback, useRef } from "react";

interface ReqConfig {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

type UseHttpRes = {
  isLoading: boolean;
  error: any;
  sendRequest: (reqConfig: ReqConfig) => any;
  clearError: () => void;
};

const useHttp = (): UseHttpRes => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  // keeps track of active http request using AbortController
  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async ({ url, method = "GET", headers = {}, body = null }: ReqConfig) => {
      setIsLoading(true);
      // clear any previous errors
      setError(null);
      // manages the request's abortion if necessary.
      const httpAbortController = new AbortController();

      activeHttpRequests.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        // remove the httpAbortController from the list activeHttpRequests
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController,
        );

        if (!response.ok) {
          throw new Error(responseData.msg);
        }
        setIsLoading(false);
        return responseData;
      } catch (error) {
        // @ts-ignore
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    [],
  );

  // clear any error stored in the error state
  const clearError = (): void => {
    setError(null);
  };

  // aborts any pending requests to prevent memory leaks
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};

export default useHttp;
