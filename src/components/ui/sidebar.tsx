"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Cookies from "js-cookie";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Dark from "./dark";
import AnimatedUI from "../animations/animatedui";
import Logout from "./logout";

function Sidebar({ navigation }: { navigation: any }) {
  const router = useRouter();
  const { setAuth } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        Cookies.remove("auth");

        setAuth({ isAuthenticated: false, accessToken: "" });

        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <AnimatedUI>
      {showSidebar ? (
        <button
          className="flex text-4xl text-cyan-500 hover:scale-110 duration-300 border-2 border-transparent p-2 rounded-full items-center cursor-pointer fixed left-10 top-8 xxxs:left-8 xxxs:top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <XMarkIcon className="block h-12 w-12" aria-hidden="true" />
        </button>
      ) : (
        <button
          className="fixed text-cyan-500 hover:scale-110 duration-300 border-2 border-transparent p-2 rounded-full z-30 flex items-center cursor-pointer left-10 xxxs:left-8 xxxs:top-6 top-8"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Bars3Icon className="block h-12 w-12" aria-hidden="true" />
        </button>
      )}
      <div className="flex text-4xl text-cyan-500 hover:scale-110 duration-300 border-2 border-transparent p-2 rounded-full items-center cursor-pointer fixed right-7 top-8 xxxs:right-7 xxxs:top-6 z-30">
        <Dark />
      </div>
      <div
        className={`top-0 right-0 w-[35vw] sm:w-[50vw] xxxs:w-[50vw] xxs:w-[50vw] bg-cyan-600 dark:bg-cyan-600 text-white fixed h-full z-40 ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center flex-col text-center h-full my-3 mx-3 gap-6">
          <div className="flex flex-col text-xl font-semibold text-white gap-3">
            {navigation.map((item: any) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className={classNames(
                  item.current
                    ? "bg-cyan-900 text-white"
                    : "text-gray-300 hover:text-white px-8 py-6 xxs:px-4 xxs:py-4 xxxs:px-4 xxxs:py-4 text-lg font-medium",
                  "px-8 py-6 xxs:px-4 xxs:py-4 xxxs:px-4 xxxs:py-4 text-lg font-medium",
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <Logout
              handleClick={handleLogout}
              handleShowSidebar={setShowSidebar}
            />
          </div>
        </div>
      </div>
    </AnimatedUI>
  );
}

export default Sidebar;
