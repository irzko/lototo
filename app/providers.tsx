"use client";
import PlayerContext from "@/context/PlayerContext";
import React, { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = React.useState<Player>({
    name: "",
    tickets: [],
  });

  useEffect(() => {
    localStorage.removeItem("selectedTickets");
    const playerLS = localStorage.getItem("player");
    playerLS && setPlayer(JSON.parse(playerLS));
  }, []);

  return (
    <PlayerContext.Provider value={[player, setPlayer]}>
      {children}
    </PlayerContext.Provider>
  );
}
