"use client";
import LottoContext from "@/context/LottoContext";
import PlayerContext from "@/context/PlayerContext";
import React, { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [currentLotto, setCurrentLotto] = React.useState<{
    color: TicketColor;
    type: TicketType;
  }>({
    color: "pink",
    type: "1",
  });

  const [player, setPlayer] = React.useState<Player>({
    name: "",
    tickets: [],
  });

  useEffect(() => {
    const localStorage = window.localStorage;
    localStorage.removeItem("selectedTickets");
    const playerLS = localStorage.getItem("player");
    playerLS && setPlayer(JSON.parse(playerLS));
  }, []);

  return (
    <LottoContext.Provider value={[currentLotto, setCurrentLotto]}>
      <PlayerContext.Provider value={[player, setPlayer]}>
        {children}
      </PlayerContext.Provider>
    </LottoContext.Provider>
  );
}
