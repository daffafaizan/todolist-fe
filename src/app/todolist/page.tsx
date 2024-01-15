"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Sidebar from "@/components/ui/sidebar";
import Footer from "@/components/ui/footer";
import Socials from "@/components/utils/socials";
import AnimatedPage from "@/components/animations/animatedpage";
import Todolist from "@/components/todolist/todolist";

function TodolistPage() {
  const navigation = [
    {
      name: "Home",
      href: "https://daffafaizan.com",
      path: "/home",
      target: "",
      rel: "",
      current: false,
    },
    {
      name: "GitHub Repo",
      href: "https://github.com/daffafaizan/todolist",
      path: "https://github.com/daffafaizan/todolist",
      target: "_blank",
      rel: "noopener noreferrer",
      current: false,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedPage>
      <Toaster />
      <div className="bg-[#F4F5F0] dark:bg-[#171717] text-stone-900 dark:text-[#EDEDED] font-inter scroll-smooth">
        <Sidebar navigation={navigation} />
        <div className="max-w-6xl w-11/12 mx-auto">
          <Todolist />
          <Socials />
          <Footer />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default TodolistPage;
