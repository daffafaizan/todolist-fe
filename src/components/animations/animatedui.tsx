"use client";

import { motion } from "framer-motion";

function AnimatedUI({ children }: { children: any }) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 1 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedUI;
