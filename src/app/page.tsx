"use client";

import AnimatedPage from "@/components/animations/animatedpage";
import Landing from "@/components/landing/landing";

function Home() {
  return (
    <AnimatedPage>
      <div className="bg-[#F4F5F0] dark:bg-[#171717] text-stone-900 dark:text-[#EDEDED] font-inter scroll-smooth p-4">
        <Landing />
      </div>
    </AnimatedPage>
  );
}

export default Home;
