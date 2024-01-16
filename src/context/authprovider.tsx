"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Cookies from "js-cookie";

type AuthState = {
  isAuthenticated: boolean;
  accessToken?: string;
};

type AuthContextType = {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
};

const AuthContext = createContext<AuthContextType>({
  auth: { isAuthenticated: false },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const storedAuth = Cookies.get("auth");
    return storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false };
  });
  useEffect(() => {
    const expirationTime = 15 * 60 * 1000; // 15 minutes in milliseconds

    const cookieExpiration = new Date(new Date().getTime() + expirationTime);

    Cookies.set("auth", JSON.stringify(auth), { expires: cookieExpiration });
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
