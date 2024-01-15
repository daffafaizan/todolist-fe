"use client";

function LoginCard() {
  return (
    <div className="dark:text-white text-stone-900 w-64 h-64 max-w-md flex flex-col items-center justify-center p-4 gap-3">
      <div className="text-2xl underline underline-offset-8 decoration-4 decoration-cyan-500 font-semibold">
        <span>Login</span>
      </div>
      <form className="mt-4 flex flex-col items-center gap-2">
        <input
          className="w-full rounded-md bg-[#edefe7] placeholder:text-sm px-2 py-1"
          placeholder="Username"
        />
        <input
          type="password"
          className="w-full rounded-md bg-[#edefe7] placeholder:text-sm px-2 py-1"
          placeholder="Password"
        />
        <button className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent bg-cyan-500 px-2 py-1 text-sm font-medium text-white hover:bg-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          Sign in
        </button>
      </form>
      <div className="text-xs flex flex-row gap-1">
        <span>Don`&apos`t have an account?</span>
        <a className="text-cyan-500 hover:text-cyan-600" href="/register">
          Register
        </a>
      </div>
    </div>
  );
}

export default LoginCard;
