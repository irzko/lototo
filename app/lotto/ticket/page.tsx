"use client";

import { lottoMap } from "@/lib/lottoMap";
import { useContext, useEffect, useState } from "react";
import SelectTicket from "@/components/ticket/select-ticket";
import LottoContext from "@/context/LottoContext";
import TicketContext from "@/context/TicketContext";
import LottoTablePlayer from "@/components/ticket/lotto-table-player";
import PlayButton from "@/components/ticket/play-button";
import Button from "@/components/ui/button";

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
        <Button
          disabled={selectedTickets.some((t) => t.id === ticket.id)}
          color={ticket.color}
          onClick={handleSelectTicket}
        >
          {selectedTickets.some((t) => t.id === ticket.id)
            ? "Đã chọn"
            : "Chọn vé"}
        </Button>
        <PlayButton />
      </div>
    </div>
  );
}
