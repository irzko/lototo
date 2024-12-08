"use client";
import PlayerContext from "@/context/PlayerContext";
import Link from "next/link";
import React, { useContext } from "react";

const MyTicketButton = () => {
  const [player] = useContext(PlayerContext);
  return (
    <Link
      href="/lotto/my-ticket"
      className="rounded-full shadow-sm font-semibold border px-4 py-2"
    >
      Vé của bạn ({player.tickets.length}/2)
    </Link>
  );
};

export default MyTicketButton;
