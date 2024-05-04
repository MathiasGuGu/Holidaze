import { useEffect, useState } from "react";

export const useCheckAuth = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>();
  const [data, setData] = useState<string | null>();

  useEffect(() => {
    const token: any = localStorage.getItem("accessToken");
    const data: any = localStorage.getItem("data");
    if (token && data) {
      setToken(token);
      setData(data);
      setAuth(true);
    } else {
      setAuth(false);
      setToken(null);
      setData(null);
    }
  }, []);

  return { auth, token, data };
};
