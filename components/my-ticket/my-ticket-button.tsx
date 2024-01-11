"use client";
import TicketContext from "@/context/TicketContext";
import Link from "next/link";
import React, { useContext } from "react";

const MyTicketButton = () => {
  const [selectedTickets] = useContext(TicketContext);
  return (
    <Link
      href="/lotto/my-ticket"
      className="rounded-full shadow-sm border px-4 py-2"
    >
      Đã chọn ({selectedTickets.length})
    </Link>
  );
};

export default MyTicketButton;
