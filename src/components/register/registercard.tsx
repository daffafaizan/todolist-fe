"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterCard() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userExistsError, setUserExistsError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (username.length < 3 || username.length > 25) {
      setUsernameError("Username too long or too short");
      return;
    } else {
      setUsernameError("");
    }

    if (password.length < 7 || password.length > 30) {
      setPasswordError("Password too long or too short");
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      if (response.ok) {
        setName("");
        setUsername("");
        setPassword("");
        setConfPassword("");

        push("/login");
      } else if (response.status === 403) {
        setUserExistsError("User already exists");
      } else if (response.status === 400) {
        setRegisterError("Invalid credentials");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <div className="text-stone-900 w-64 h-64 max-w-md flex flex-col items-center justify-center p-4 gap-3">
      <div className="text-2xl underline underline-offset-8 decoration-4 decoration-cyan-500 font-semibold">
        <span>Register</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-4 flex flex-col items-center gap-2"
      >
        <input
          className={`w-full rounded-md bg-[#edefe7] ${
            registerError ? "border border-red-500" : "border-transparent"
          } placeholder:text-sm px-2 py-1`}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
        />
        <input
          className={`w-full rounded-md bg-[#edefe7] ${
            registerError || usernameError || userExistsError
              ? "border border-red-500"
              : "border-transparent"
          } placeholder:text-sm px-2 py-1`}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
        {usernameError && (
          <div className="w-full flex justify-center items-center">
            <span className="text-[10px] text-red-500">{usernameError}</span>
          </div>
        )}
        <input
          type="password"
          className={`w-full rounded-md bg-[#edefe7] ${
            registerError || passwordError
              ? "border border-red-500"
              : "border-transparent"
          } placeholder:text-sm px-2 py-1`}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <input
          type="password"
          className={`w-full rounded-md bg-[#edefe7] ${
            registerError || passwordError
              ? "border border-red-500"
              : "border-transparent"
          } placeholder:text-sm px-2 py-1`}
          placeholder="Confirm password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.currentTarget.value)}
          required
        />
        {passwordError && (
          <div className="w-full flex justify-center items-center">
            <span className="text-[10px] text-red-500">{passwordError}</span>
          </div>
        )}
        {userExistsError && (
          <div className="w-full flex justify-center items-center">
            <span className="text-[10px] text-red-500">{userExistsError}</span>
          </div>
        )}
        {registerError && (
          <div className="w-full flex justify-center items-center">
            <span className="text-[10px] text-red-500">{registerError}</span>
          </div>
        )}
        <button className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-cyan-500 px-2 py-1 text-sm font-medium text-white hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Sign up
        </button>
      </form>
      <div className="text-xs flex flex-row gap-1">
        <span>Already registered?</span>
        <a className="text-cyan-500 hover:text-cyan-600" href="/login">
          Login
        </a>
      </div>
    </div>
  );
}

export default RegisterCard;
