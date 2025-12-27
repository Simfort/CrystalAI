"use client";
import Button from "@/components/Button";

import AnimtTitle from "./_components/AnimTitle";
import Textarea from "./_components/Textarea";
import { useState } from "react";
import ModalFormLogin from "./_components/ModalFormLogIn";
import { AnimatePresence } from "motion/react";

export default function Home() {
  const [flagLogIn, setFlagLogIn] = useState(false);
  return (
    <div className="grid  grid-cols-7">
      <header
        aria-label="Навигация сайта"
        className="col-start-2 py-[28px] mt-[20px] bg-primry-opacity rounded-[20px]  items-center flex justify-end col-span-5">
        <Button
          onClick={() => setFlagLogIn(true)}
          className="w-[92px] h-[33px] mr-[50px]"
          aria-label="Открыть форму входа">
          Вход
        </Button>
      </header>
      <section
        className="col-span-full mt-[200px] flex justify-center items-center"
        aria-labelledby="main-title">
        <div>
          {" "}
          <AnimtTitle />
          <h2
            id="main-title"
            className="text-2xl mb-[10px] text-accent text-center ">
            За вас всё придумает нейросеть
          </h2>
          <Textarea />
        </div>
      </section>
      <AnimatePresence mode="wait">
        {flagLogIn && <ModalFormLogin setFlag={setFlagLogIn} />}
      </AnimatePresence>
    </div>
  );
}
