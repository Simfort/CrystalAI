"use client";
import { useEffect, useState } from "react";
import ModalFormLogin from "./ModalFormLogIn";
import { AnimatePresence } from "motion/react";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";

import Image from "next/image";

export default function Header() {
  const [flagLogIn, setFlagLogIn] = useState(false);
  const { data: session, status } = useSession();
  const onClickHandler = () => {
    setFlagLogIn(true);
  };

  return (
    <header
      aria-label="Навигация сайта"
      className="col-start-2 py-[28px] mt-[20px] bg-primry-opacity rounded-[20px]  items-center flex justify-end col-span-5">
      {session?.user ? (
        <div className="flex items-center gap-5 mr-[50px]">
          <Image
            width={50}
            height={50}
            className="rounded-full"
            src={session.user.image}
            alt="Пользователь"
          />
          <p className="font-medium">{session.user.name}</p>
        </div>
      ) : (
        <>
          <Button
            onClick={onClickHandler}
            className="w-[92px] h-[33px] mr-[50px]"
            aria-label="Открыть форму входа">
            Вход
          </Button>
          <AnimatePresence mode="wait">
            {flagLogIn && <ModalFormLogin setFlag={setFlagLogIn} />}
          </AnimatePresence>
        </>
      )}
    </header>
  );
}
