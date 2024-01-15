"use client";

import AnimatedPage from "@/components/animations/animatedpage";
import Login from "@/components/login/login";

function RegisterPage() {
  return (
    <AnimatedPage>
      <div className="bg-[#F4F5F0] dark:bg-[#171717] text-stone-900 dark:text-[#EDEDED] font-inter scroll-smooth">
        <div className="mx-auto">
          <Login />
        </div>
      </div>
    </AnimatedPage>
  );
}

export default RegisterPage;
