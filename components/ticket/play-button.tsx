"use client";
import TicketContext from "@/context/TicketContext";
import Link from "next/link";
import React, { useContext } from "react";

const PlayButton = () => {
  const [selectedTickets] = useContext(TicketContext);
  return (
    <Link href="/lotto/play" className="rounded-full text-sky-900 font-semibold shadow-sm border px-4 py-2">
      Dò ({selectedTickets.length})
    </Link>
  );
};

export default PlayButton;
