"use client";

import { useRouter } from "next/navigation";
import AnimatedComponents from "../animations/animatedcomponents";

function Landing() {
  const router = useRouter();
  const handleOnline = () => {
    router.push("/login");
  };
  return (
    <AnimatedComponents>
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <div className="flex flex-col justify-center items-center">
          <span className="text-5xl font-semibold">Todolist</span>
          <span className="text-xs">by dmf.</span>
          <div className="flex flex-row bg-[#ebede4] rounded-3xl px-4 py-3 text-xl mt-2 gap-6">
            <a
              href="https://todolist-by-dmf.netlify.app"
              className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-3xl px-4 py-2"
            >
              Offline
            </a>
            <button
              onClick={handleOnline}
              className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-3xl px-4 py-2"
            >
              Online
            </button>
          </div>
        </div>
      </div>
    </AnimatedComponents>
  );
}

export default Landing;
