"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import AuthContext from "@/context/authprovider";

function LoginCard() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  const { push } = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        setUsername("");
        setPassword("");
        console.log(response);

        push("/todolist");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="dark:text-white text-stone-900 w-64 h-64 max-w-md flex flex-col items-center justify-center p-4 gap-3">
      <div className="text-2xl underline underline-offset-8 decoration-4 decoration-cyan-500 font-semibold">
        <span>Login</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col items-center gap-2"
      >
        <input
          className="w-full rounded-md bg-[#edefe7] placeholder:text-sm px-2 py-1"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
        <input
          type="password"
          className="w-full rounded-md bg-[#edefe7] placeholder:text-sm px-2 py-1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
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
