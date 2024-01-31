import Link from "next/link";
import React from "react";
import { Lobster } from "next/font/google";
import { tv } from "tailwind-variants";
const lobster = Lobster({ weight: "400", subsets: ["latin"] });

const logo = tv({
  base: `${lobster.className} text-purple-800 font-bold text-2xl`,
  variants: {
    size: {
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default function Logo({
  className,
  size,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link href="/" className={logo({ size, className })}>
      Lôtôtô
    </Link>
  );
}
