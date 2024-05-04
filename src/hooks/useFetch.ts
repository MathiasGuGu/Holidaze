import { useEffect, useState } from "react";

type FetchResponse<T> = {
  data: T | any;
  loading: boolean;
  error: any;
};

export const useFetch = <T>(url: string): FetchResponse<T> => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ignore, setIgnore] = useState(false);

  useEffect(() => {
    if (ignore) return;
    setLoading(true);
    setData(null);
    setError(null);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};
