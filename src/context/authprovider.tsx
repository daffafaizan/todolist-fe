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
import useRefreshToken from "@/hooks/useRefreshToken";
import { jwtDecode } from "jwt-decode";

type AuthState = {
  isAuthenticated: boolean;
  accessToken?: string;
  refreshToken?: string;
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
    const decodedAuth = decodeURIComponent(storedAuth || ""); // URL-decode the cookie value

    return decodedAuth ? JSON.parse(decodedAuth) : { isAuthenticated: false };
  });

  useEffect(() => {
    const refreshTokenExpirationTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const accessTokenExpirationTime = 15 * 60 * 1000; // 15 minutes in milliseconds

    const checkAccessTokenExpiration = () => {
      if (auth.accessToken) {
        const decodedToken: any = jwtDecode(auth.accessToken);

        if (decodedToken) {
          const issuedAt = decodedToken.iat * 1000; // Convert seconds to milliseconds
          const currentTime = new Date().getTime();

          // Check if the token has been in use for a long time and is close to expiration
          if (currentTime - issuedAt > accessTokenExpirationTime / 2) {
            // Access token is older than half of its expiration time, attempt to refresh
          }
        }
      }
    };

    const checkRefreshTokenExpiration = () => {
      if (auth.refreshToken) {
        const decodedToken: any = jwtDecode(auth.refreshToken);

        if (
          decodedToken &&
          decodedToken.iat * 1000 + refreshTokenExpirationTime <
            new Date().getTime()
        ) {
          // Refresh token is about to expire, clear cookies and redirect to login
          Cookies.remove("auth");
          window.location.href = "/login";
        }
      }
    };

    const cookieExpiration = new Date(
      new Date().getTime() + refreshTokenExpirationTime,
    );
    Cookies.set("auth", JSON.stringify(auth), { expires: cookieExpiration });

    checkAccessTokenExpiration();
    checkRefreshTokenExpiration();

    const intervalId = setInterval(() => {
      checkAccessTokenExpiration();
    }, 60000 * 10); // Check every 10 minutes

    // Clear the interval on component unmount or when auth changes
    return () => clearInterval(intervalId);
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
