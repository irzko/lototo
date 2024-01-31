import React from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "select-none active:pb-0.5 text-white pb-1.5 shadow-md transition-[.2s] overflow-hidden border-2 rounded-xl",
  variants: {
    color: {
      primary: "bg-purple-500 border-purple-800",
      secondary: "bg-gray-300 border-gray-800",
      danger: "bg-yellow-500 border-yellow-800",
    },
    size: {
      sm: "h-10",
      md: "h-12",
      lg: "w-14",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

const innerButton = tv({
  base: "flex px-2 h-full items-center font-semibold justify-center rounded-b-xl",
  variants: {
    color: {
      primary: "bg-purple-400",
      secondary: "bg-gray-100 text-gray-900",
      danger: "bg-yellow-400",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export default function Button({
  children,
  className,
  color,
  buttonRef,
  fullWidth,
  size,
  ...props
}: {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      ref={buttonRef}
      className={button({ color, className, size, fullWidth })}
    >
      <span className={innerButton({ color })}>{children}</span>
    </button>
  );
}
