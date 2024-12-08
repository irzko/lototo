import { colorBase } from "@/lib/schemeColor";
import React from "react";
import { tv } from "tailwind-variants";

const button = tv({
  extend: colorBase,
  base: "text-white py-2 px-4 rounded-full shadow-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition",
});

export default function Button({
  children,
  className,
  color,
  buttonRef,
  ...props
}: {
  children: React.ReactNode;
  color?: TicketColor;
  buttonRef?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} ref={buttonRef} className={button({ color, className })}>
      {children}
    </button>
  );
}
