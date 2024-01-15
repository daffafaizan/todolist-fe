"use client";

import AnimatedComponents from "../animations/animatedcomponents";
import LoginCard from "./logincard";
import LoginLanding from "./loginlanding";

function Login() {
  return (
    <AnimatedComponents>
      <div className="min-h-screen flex">
        <div className="hidden w-1/2 sm:flex md:flex lg:flex xl:flex flex-col justify-center items-center bg-stone-900 p-4">
          <LoginLanding />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-center items-center p-4">
          <LoginCard />
        </div>
      </div>
    </AnimatedComponents>
  );
}

export default Login;
