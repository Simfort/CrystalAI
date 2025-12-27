"use client";
import { useState } from "react";
import ModalFormLogin from "./ModalFormLogIn";
import { AnimatePresence } from "motion/react";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SessionParams } from "@/config/auth";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";

export default function Header() {
  const [flagLogIn, setFlagLogIn] = useState(false);
  const [exitFlagModal, setExitFlagModal] = useState(false);
  const { data: session, status } = useSession();

  const onClickHandler = () => {
    setFlagLogIn(true);
  };

  return (
    <header
      onMouseLeave={() => {
        setExitFlagModal(false);
      }}
      aria-label="Навигация сайта"
      className="col-start-2 py-[28px] mt-[20px]  bg-primry-opacity rounded-[20px]  items-center flex justify-end col-span-5">
      {session?.user ? (
        <div className="flex items-center gap-5 mr-[50px]">
          <div className="flex gap-2 ">
            <p className="text-primary-light text-xl">
              {(session as SessionParams["session"]).user.crystalsCount}
            </p>
            <Image
              width={30}
              height={30}
              src={"/crystal.svg"}
              alt="Иконка кристала"
            />
          </div>
          <div className="flex gap-2 items-center ">
            <div
              onMouseEnter={() => setExitFlagModal(true)}
              className="overflow-hidden h-[50px]">
              <Image
                width={50}
                height={50}
                className="rounded-full"
                src={session.user.image!}
                alt="Пользователь"
              />
              <AnimatePresence mode="wait">
                {exitFlagModal && (
                  <motion.div
                    onMouseLeave={() => setExitFlagModal(false)}
                    className="h-screen">
                    <motion.button
                      onClick={() => signOut()}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ opacity: 0.5 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="p-5  cursor-pointer flex  items-center   rounded-[10px] w-[120px]  justify-center gap-2 translate-y-[10px] h-[50px] bg-primary-light absolute">
                      Выйти
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="font-medium">{session.user.name}</p>
          </div>
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
