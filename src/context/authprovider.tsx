"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

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
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
