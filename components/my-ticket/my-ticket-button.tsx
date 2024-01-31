"use client";
import PlayerContext from "@/context/PlayerContext";
import Link from "next/link";
import React, { useContext } from "react";

const MyTicketButton = () => {
  const [player] = useContext(PlayerContext);
  return (
    <Link
      href="/lotto/my-ticket"
      className="bg-orange-500 border-orange-800 flex flex-col h-12 select-none active:pb-0.5 text-white pb-1.5 shadow-md transition-[.2s] overflow-hidden border-2 rounded-xl"
    >
      <div className="bg-orange-400 flex gap-2 px-2 h-full items-center font-semibold justify-center rounded-b-xl">
        Vé của tôi ({player.tickets.length}/2)
      </div>
    </Link>
  );
};

export default MyTicketButton;
