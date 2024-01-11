import { Metadata } from "next";
import React from "react";
import Providers from "../providers";
import MyTicketButton from "@/components/my-ticket/my-ticket-button";
import NavBar from "@/components/navbar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <NavBar>
        <ul className="flex justify-center items-center h-full gap-4">
          <li>
            <MyTicketButton />
          </li>
        </ul>
      </NavBar>
      <main className="mt-16">{children}</main>
    </Providers>
  );
}
