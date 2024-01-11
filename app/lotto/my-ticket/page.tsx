"use client";
import TicketContext from "@/context/TicketContext";
import { colorBase } from "@/lib/schemeColor";
import React, { useContext } from "react";

export default function Page() {
  const [selectedTickets] = useContext(TicketContext);
  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full">
        <ul>
          {selectedTickets.map((ticket) => (
            <li key={ticket.id}>
              <h4>{ticket.type}</h4>
              <div
                className={colorBase({
                  className: "h-5 w-5",
                  color: ticket.color,
                })}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
