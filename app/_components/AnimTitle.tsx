"use client";
import { TITLE_VARIANTS } from "@/lib/titleVariants";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AnimtTitle() {
  const [currVariant, setCurrVariant] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrVariant((prev) => {
        if (prev >= 3) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={currVariant}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        className="text-[50px] text-center ">
        {" "}
        {TITLE_VARIANTS[currVariant][0]}{" "}
        <span className="text-primary-light inline-block">
          {TITLE_VARIANTS[currVariant][1]}
        </span>
      </motion.h1>
    </AnimatePresence>
  );
}
