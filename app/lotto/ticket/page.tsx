"use client";

import { lottoMap } from "@/lib/lottoMap";
import { useContext, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import SelectTicket from "@/components/ticket/select-ticket";
import LottoContext from "@/context/LottoContext";
import TicketContext from "@/context/TicketContext";
import { colorBase } from "@/lib/schemeColor";
import LottoTablePlayer from "@/components/ticket/lotto-table-player";
import PlayButton from "@/components/ticket/play-button";

const ticketButton = tv({
  extend: colorBase,
  base: "text-white py-2 px-4 rounded-full shadow-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition",
});

export default function Page() {
  const [currentLotto] = useContext(LottoContext);
  const [ticket, setTicket] = useState<Ticket>();
  const [selectedTickets, setSelectedTickets] = useContext(TicketContext);

  useEffect(() => {
    const board = lottoMap.find(
      (item) =>
        item.color === currentLotto.color && item.type === currentLotto.type
    );
    if (board) {
      setTicket(board);
    }
  }, [currentLotto.color, currentLotto.type]);

  if (!ticket) {
    return (
      <div>
        <div className="fixed inset-0 font-medium flex justify-center items-center">
          Đang tải...
        </div>
      </div>
    );
  }

  const handleSelectTicket = () => {
    if (selectedTickets.length <= 1) {
      setSelectedTickets((prev) => {
        const newSelectedTickets = [...prev];
        newSelectedTickets.push(ticket);
        localStorage.setItem(
          "selectedTickets",
          JSON.stringify(newSelectedTickets)
        );
        return newSelectedTickets;
      });
    } else {
      alert("Chỉ được chọn tối đa 2 vé, nhắm dò kịp hông?");
    }
  };

  return (
    <div
      className={`w-full p-2 flex flex-col justify-center space-y-4 items-center`}
    >
      <nav className="flex sticky top-16 w-full justify-center">
        <SelectTicket />
      </nav>
      <LottoTablePlayer ticket={ticket} />
      <div className="mt-4 flex gap-4">
        <button
          disabled={selectedTickets.some((t) => t.id === ticket.id)}
          className={ticketButton({ color: ticket.color })}
          onClick={handleSelectTicket}
        >
          {selectedTickets.some((t) => t.id === ticket.id)
            ? "Đã chọn"
            : "Chọn vé"}
        </button>
        <PlayButton />
      </div>
    </div>
  );
}
