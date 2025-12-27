"use client";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { X } from "lucide-react";
import Button from "@/components/Button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function ModalFormLogin({
  setFlag,
}: {
  setFlag: (arg: boolean) => void;
}) {
  return createPortal(
    <motion.div
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 bottom-0  left-0 right-0 backdrop-blur-md  bg-primary-opacity flex items-center justify-center h-screen w-full">
      <motion.form
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        exit={{ y: 20 }}
        className="rounded-[20px] w-[400px] flex flex-col gap-4 p-5 bg-[#430c51]">
        <div className="w-full p-2 flex justify-end">
          <button
            type="button"
            onClick={() => setFlag(false)}
            className="hover:bg-accent rounded-full transition-all p-2">
            <X className="cursor-pointer " />
          </button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl  text-center font-bold">
            Войдите в свой аккаунт
          </h2>
          <p className="text-accent">,чтобы начать работу</p>
          <Button
            type="button"
            onClick={() => signIn("telegram")}
            aria-label="Войти через Telegram">
            <Image
              width={30}
              height={30}
              src="/Telegram.svg"
              alt="telegram-icon"
            />
            <p>через телеграм</p>
          </Button>
          <p className="text-accent text-[16px]">или через</p>
        </div>
        <div className="flex w-full gap-2 justify-center">
          <button
            className="cursor-pointer hover:bg-accent hover:opacity-50 rounded-full p-2  transition-all"
            aria-label="Войти через Yandex">
            {" "}
            <Image
              src="/yandex.svg"
              width={30}
              height={30}
              alt="Войти через Yandex "
            />
          </button>
          <button
            className="cursor-pointer hover:bg-accent hover:opacity-50 rounded-full p-2  transition-all"
            aria-label="Войти через Google">
            <Image
              src="/google.svg"
              width={30}
              height={30}
              alt="Войти через Google"
            />
          </button>
          <button
            className="cursor-pointer hover:bg-accent hover:opacity-50 rounded-full p-2  transition-all"
            aria-label="Войти через Github">
            <Image src="/github.svg" width={30} height={30} alt="Github icon" />
          </button>
        </div>
      </motion.form>
    </motion.div>,
    document.body
  );
}
