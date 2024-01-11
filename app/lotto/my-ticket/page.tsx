"use client";
import TicketContext from "@/context/TicketContext";
import { colorBase } from "@/lib/schemeColor";
import React, { useContext } from "react";

export default function Page() {
  const [selectedTickets, setSelectedTickets] = useContext(TicketContext);
  const handleDeleteTicket = (ticketId: number) => {
    setSelectedTickets((prev) => {
      const newSelectedTickets = prev.filter(
        (ticket) => ticket.id !== ticketId
      );
      localStorage.setItem(
        "selectedTickets",
        JSON.stringify(newSelectedTickets)
      );
      return newSelectedTickets;
    });
  };
  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full">
        <ul className="space-y-2 p-2">
          {selectedTickets.map((ticket) => (
            <li
              key={ticket.id}
              className="flex items-center rounded-2xl justify-between gap-2 border p-4 bg-white"
            >
              <div
                className={colorBase({
                  className: "h-10 w-10 rounded-full",
                  color: ticket.color,
                })}
              ></div>
              <h4 className="text-sky-900 font-semibold">
                Loại vé: #{ticket.type}
              </h4>
              <button onClick={() => handleDeleteTicket(ticket.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
