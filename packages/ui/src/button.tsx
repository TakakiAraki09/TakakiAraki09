"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export const Card = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
  >
    コンテンツ
  </motion.div>
);

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <div className={css}>
      <button
        className={className}
        onClick={() => alert(`Hello from your ${appName} app!`)}
      >
        {children}
      </button>
    </div>
  );
};
