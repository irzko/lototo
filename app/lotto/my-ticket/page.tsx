"use client";
import PlayerContext from "@/context/PlayerContext";
import findTicketById from "@/lib/findTicketById";
import { colorBase } from "@/lib/schemeColor";
import Link from "next/link";
import React, { useContext } from "react";

export default function Page() {
  const [player, setPlayer] = useContext(PlayerContext);
  const handleDeleteTicket = (ticketId: number) => {
    setPlayer((prev) => {
      const newTickets = prev.tickets.filter((id) => id !== ticketId);
      localStorage.setItem(
        "player",
        JSON.stringify({ ...prev, tickets: newTickets })
      );
      return {
        ...prev,
        tickets: newTickets,
      };
    });
  };
  return (
    <div className="flex justify-center">
      <div className="max-w-md p-2 space-y-4 flex flex-col w-full">
        <div className="flex flex-col space-y-2 bg-white border shadow-sm rounded-2xl p-2">
          <h2 className="text-sky-900 font-semibold">Vé của bạn</h2>
          <hr />
          {player.tickets.length > 0 ? (
            <ul className="space-y-2">
              {player.tickets.map((ticketId) => {
                const ticket = findTicketById(ticketId);
                return (
                  <li
                    key={ticketId}
                    className="flex items-center shadow-sm rounded-2xl justify-between gap-2 border p-4 bg-white"
                  >
                    <div className="w-full h-full flex gap-2 items-center">
                      <div
                        className={colorBase({
                          className:
                            "h-10 w-10 border-2 border-sky-900 rounded-full",
                          color: ticket!.color,
                        })}
                      ></div>
                      <h4 className="text-sky-900 font-semibold">
                        Loại vé: #{ticket!.type}
                      </h4>
                    </div>
                    <button
                      className="text-rose-600"
                      onClick={() => handleDeleteTicket(ticketId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col gap-2 items-center p-2">
              <p className="text-gray-900">Bạn chưa có vé nào</p>
              <Link
                href="/lotto/ticket"
                className="rounded-full text-sky-900 font-semibold shadow-sm border px-2 py-1"
              >
                Chọn vé
              </Link>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2">
          <Link
            href="/lotto/host"
            className="rounded-full text-sky-900 font-semibold shadow-sm border px-4 py-2"
          >
            Gọi số
          </Link>
          <Link
            href="/lotto/play"
            className="rounded-full bg-sky-900 text-white font-semibold shadow-sm border px-4 py-2"
          >
            Bắt đầu
          </Link>
        </div>
      </div>
    </div>
  );
}
