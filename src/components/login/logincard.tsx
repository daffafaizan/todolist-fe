"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

function LoginCard() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  const router = useRouter();
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setUsername("");
        setPassword("");
        setAuth({
          isAuthenticated: true,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });

        router.push("/todolist");
      } else if (response.status === 404) {
        setLoginError("Username not found");
      } else if (response.status === 400) {
        setLoginError("Invalid credentials");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="text-stone-900 w-64 h-64 max-w-md flex flex-col items-center justify-center p-4 gap-3">
      <div className="text-2xl underline underline-offset-8 decoration-4 decoration-cyan-500 font-semibold">
        <span>Login</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-4 flex flex-col items-center gap-2"
      >
        <input
          className={`w-full rounded-md bg-[#edefe7] ${
            loginError ? "border border-red-500" : "border-transparent"
          } placeholder:text-sm px-2 py-1`}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
        <input
          type="password"
          className={`w-full rounded-md bg-[#edefe7] ${
            loginError ? "border border-red-500" : "border-transparent"
          } placeholder:text-sm px-2 py-1`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        {loginError && (
          <div className="w-full flex justify-center items-center">
            <span className="text-[10px] text-red-500">{loginError}</span>
          </div>
        )}
        <button className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-cyan-500 px-2 py-1 text-sm font-medium text-white hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Sign in
        </button>
      </form>
      <div className="text-xs flex flex-row gap-1">
        <span>Don&apos;t have an account?</span>
        <a className="text-cyan-500 hover:text-cyan-600" href="/register">
          Register
        </a>
      </div>
    </div>
  );
}

export default LoginCard;
