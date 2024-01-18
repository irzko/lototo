"use client";

import { lottoTickets } from "@/lib/lottoMap";
import { useContext, useEffect, useState } from "react";
import SelectTicket from "@/components/ticket/select-ticket";
import LottoContext from "@/context/LottoContext";
import LottoTablePlayer from "@/components/ticket/lotto-table-player";
import Button from "@/components/ui/button";
import PlayerContext from "@/context/PlayerContext";
import useModal from "@/hooks/useModal";

export default function Page() {
  const [currentLotto] = useContext(LottoContext);
  const [ticketId, setTicket] = useState<Ticket>({} as Ticket);
  const [player, setPlayer] = useContext(PlayerContext);
  const [modal, showModal] = useModal();

  useEffect(() => {
    const board = lottoTickets.find(
      (item) =>
        item.color === currentLotto.color && item.type === currentLotto.type
    );
    if (board) {
      setTicket(board);
    }
  }, [currentLotto.color, currentLotto.type]);

  if (!ticketId.id) {
    return (
      <div>
        <div className="fixed font-semibold text-sky-900 inset-0 flex justify-center items-center">
          Đang tải...
        </div>
      </div>
    );
  }

  const handleSelectTicket = () => {
    if (player && player.tickets.length <= 1) {
      setPlayer((prev) => {
        const newPlayer = {
          ...prev,
          tickets: [...prev.tickets, ticketId.id],
        };
        localStorage.setItem("player", JSON.stringify(newPlayer));
        return newPlayer;
      });
    } else {
      showModal((onClose) => {
        return (
          <div className="space-y-2">
            <h4 className="font-semibold text-sky-900">Chờ chút</h4>
            <hr />
            <div className="flex justify-center w-full">
              <p className="font-semibold">Chỉ được chọn 2 vé</p>
            </div>
            <div className="text-end">
              <Button className="text-sky-900 border" onClick={onClose}>
                Trở về
              </Button>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <>
      <div
        className={`w-full p-2 flex flex-col justify-center space-y-4 items-center`}
      >
        <nav className="flex sticky top-16 w-full justify-center">
          <SelectTicket />
        </nav>
        <LottoTablePlayer ticketId={ticketId.id} />
        <div className="mt-4">
          <Button
            disabled={player.tickets.includes(ticketId.id)}
            color={ticketId.color}
            onClick={handleSelectTicket}
          >
            {player.tickets.includes(ticketId.id) ? "Đã chọn" : "Chọn vé"}
          </Button>
        </div>
      </div>
      {modal}
    </>
  );
}
