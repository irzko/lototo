"use client";
import LottoContext from "@/context/LottoContext";
import TicketContext from "@/context/TicketContext";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [currentLotto, setCurrentLotto] = React.useState<{
    color: TicketColor;
    type: TicketType;
  }>({
    color: "pink",
    type: "1",
  });

  const [selectedTickets, setSelectedTickets] = React.useState<Ticket[]>([]);

  return (
    <LottoContext.Provider value={[currentLotto, setCurrentLotto]}>
      <TicketContext.Provider value={[selectedTickets, setSelectedTickets]}>
        {children}
      </TicketContext.Provider>
    </LottoContext.Provider>
  );
}
