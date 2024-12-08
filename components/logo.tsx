import Link from "next/link";
import React from "react";
import { Lobster } from "next/font/google";
const lobster = Lobster({ weight: "400", subsets: ["latin"] });

export default function Logo() {
  return (
    <Link
      href="/"
      className={`${lobster.className} text-sky-900 font-bold text-2xl`}
    >
      Lôtôtô
    </Link>
  );
}
