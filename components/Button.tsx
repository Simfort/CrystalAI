import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Button({ children, className, ...args }: ButtonProps) {
  return (
    <button
      className={`
        bg-primary 
        p-5
        hover:opacity-50
        transition-all
        cursor-pointer
        flex
        items-center
        rounded-[10px]
        justify-center
        gap-2
        ${className || ""}
      `}
      {...args}>
      {children}
    </button>
  );
}
