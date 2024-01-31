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
    <div className="flex justify-center pt-2">
      <div className="max-w-md p-2 space-y-4 flex flex-col w-full">
        <div className="bg-purple-300 p-1 border-2 rounded-2xl border-purple-800">
          <div className="flex flex-col space-y-2 bg-purple-200 shadow-sm rounded-xl p-2">
            <div className="flex items-center justify-between">
              <h2 className="text-purple-800 font-semibold">Vé của bạn</h2>
              {player.tickets.length < 2 ? (
                <Link
                  href="/lotto/ticket"
                  className="bg-purple-500 border-purple-800 flex flex-col h-10 select-none active:pb-0.5 text-white pb-1.5 shadow-md transition-[.2s] overflow-hidden border-2 rounded-xl"
                >
                  <div className="bg-purple-400 flex gap-2 px-2 h-full items-center font-semibold justify-center rounded-b-xl">
                    Thêm
                  </div>
                </Link>
              ) : (
                <span></span>
              )}
            </div>
            <hr className="border-t-2 border-t-purple-800" />
            {player.tickets.length > 0 ? (
              <ul className="space-y-2">
                {player.tickets.map((ticketId) => {
                  const ticket = findTicketById(ticketId);
                  return (
                    <li
                      key={ticketId}
                      className="flex items-center shadow-sm rounded-2xl justify-between gap-2 p-1 overflow-hidden bg-purple-400 border-2 border-purple-800"
                    >
                      <div className="bg-purple-300 flex w-full rounded-xl p-2">
                        <div className="w-full h-full flex gap-2 items-center">
                          <div
                            className={colorBase({
                              className:
                                "h-10 w-10 border-2 border-purple-800 rounded-full",
                              color: ticket!.color,
                            })}
                          ></div>
                          <h4 className="text-purple-800 font-semibold">
                            Loại vé: #{ticket!.type}
                          </h4>
                        </div>
                        <button
                          className="text-purple-800 "
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
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col gap-2 items-center p-2">
                <p className="text-purple-800">Bạn chưa có vé nào</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Link
            href="/lotto/host"
            className="bg-red-500 border-red-800 flex flex-col h-12 select-none active:pb-0.5 text-white pb-1.5 shadow-md transition-[.2s] overflow-hidden border-2 rounded-xl"
          >
            <div className="bg-red-400 flex gap-2 px-2 h-full items-center font-semibold justify-center rounded-b-xl">
              Gọi số
            </div>
          </Link>
          <Link
            href="/lotto/play"
            className="bg-purple-500 border-purple-800 flex flex-col h-12 select-none active:pb-0.5 text-white pb-1.5 shadow-md transition-[.2s] overflow-hidden border-2 rounded-xl"
          >
            <div className="bg-purple-400 flex gap-2 px-2 h-full items-center font-semibold justify-center rounded-b-xl">
              Bắt đầu
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
