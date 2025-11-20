"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { css } from "@repo/panda-config/css";

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
  children?: ReactNode;
  className?: string;
  appName?: string;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <div
      className={css({
        display: 'inline-block',
        bg: 'rose.500',
        paddingX: "10",
        paddingY: "20",
      })}
    >
      {children}
    </div>
  );
};
