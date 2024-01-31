"use client";

import { lottoTickets } from "@/lib/lottoMap";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import SelectTicket from "@/components/ticket/select-ticket";
import LottoContext from "@/context/LottoContext";
import LottoTablePlayer from "@/components/ticket/lotto-table-player";
import Button from "@/components/ui/button";
import PlayerContext from "@/context/PlayerContext";
import useModal from "@/hooks/useModal";

export default function Page() {
  const [currentLotto, setCurrentLotto] = useState<{
    color: TicketColor;
    type: TicketType;
  }>({
    color: "pink",
    type: "1",
  });
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const [player, setPlayer] = useContext(PlayerContext);
  const [modal, showModal] = useModal();
  const isSelect = useMemo(() => {
    return player.tickets.includes(ticket.id);
  }, [player.tickets, ticket.id]);

  useEffect(() => {
    const board = lottoTickets.find(
      (item) =>
        item.color === currentLotto.color && item.type === currentLotto.type
    );
    if (board) {
      setTicket(board);
    }
  }, [currentLotto.color, currentLotto.type]);

  if (!ticket.id) {
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
          tickets: [...prev.tickets, ticket.id],
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
              <p className="font-semibold">Chỉ được chọn tối đa 2 vé</p>
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

  const handleUnSelectTicket = () => {
    setPlayer((prev) => {
      const newPlayer = {
        ...prev,
        tickets: prev.tickets.filter((item) => item !== ticket.id),
      };
      localStorage.setItem("player", JSON.stringify(newPlayer));
      return newPlayer;
    });
  };

  return (
    <LottoContext.Provider value={[currentLotto, setCurrentLotto]}>
      <div
        className={`w-full p-2 flex flex-col justify-center space-y-4 items-center`}
      >
        <nav className="flex sticky top-20 w-full justify-center">
          <SelectTicket />
        </nav>
        <div className="w-full max-w-md justify-center rounded-2xl p-1 bg-purple-300 border-purple-800 border-2">
          <div className="w-full bg-purple-200 p-1 rounded-xl">
            <LottoTablePlayer ticket={ticket} />
            <div className="mt-4 w-full">
              <Button
                fullWidth
                color={isSelect ? "secondary" : "primary"}
                onClick={isSelect ? handleUnSelectTicket : handleSelectTicket}
              >
                {isSelect ? "Hủy chọn" : "Chọn"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {modal}
    </LottoContext.Provider>
  );
}
