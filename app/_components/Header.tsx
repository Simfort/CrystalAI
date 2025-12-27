"use client";
import { useState } from "react";
import ModalFormLogin from "./ModalFormLogIn";
import { AnimatePresence } from "motion/react";
import Button from "@/components/Button";

export default function Header() {
  const [flagLogIn, setFlagLogIn] = useState(false);
  return (
    <header
      aria-label="Навигация сайта"
      className="col-start-2 py-[28px] mt-[20px] bg-primry-opacity rounded-[20px]  items-center flex justify-end col-span-5">
      <Button
        onClick={() => setFlagLogIn(true)}
        className="w-[92px] h-[33px] mr-[50px]"
        aria-label="Открыть форму входа">
        Вход
      </Button>
      <AnimatePresence mode="wait">
        {flagLogIn && <ModalFormLogin setFlag={setFlagLogIn} />}
      </AnimatePresence>
    </header>
  );
}
