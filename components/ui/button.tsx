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
  ...props
}: {
  children: React.ReactNode;
  color?: TicketColor;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={button({ color, className })}>
      {children}
    </button>
  );
}
