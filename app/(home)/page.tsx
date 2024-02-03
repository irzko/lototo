"use client";
// import RegisterPopup from "@/components/register-popup";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { tv } from "tailwind-variants";
import dynamic from "next/dynamic";
import Logo from "@/components/logo";
const RegisterPopup = dynamic(() => import("@/components/join-game-popup"), {
  ssr: false,
});

const menuItem = tv({
  base: "w-full rounded-2xl shadow-sm flex gap-2 bg-white justify-center items-center h-14 select-none border-2 py-1 active:shadow-[0px_0px_0px_0px] shadow-[1px_1px_0px_0px,_2px_2px_0px_0px,_3px_3px_0px_0px,_4px_4px_0px_0px,_5px_5px_0px_0px] text-purple-600 hover:bg-purple-300 font-semibold bg-purple-400 border-purple-300 transition-colors",
});

const MenuItem = ({
  children,
  icon,
  className,
  href = "#",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  href?: string;
}) => {
  return (
    <Link
      href={href}
      className="bg-purple-500 border-purple-800 h-12 select-none active:pb-0.5 text-white pb-1.5 shadow-md transition-[.2s] overflow-hidden border-2 rounded-xl"
    >
      <div className="bg-purple-400 flex gap-2 px-2 h-full items-center font-semibold justify-center rounded-b-xl">
        {icon}
        {children}
      </div>
    </Link>
  );
};

function Card({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="rounded-2xl p-1 bg-purple-300 space-y-2 shadow-sm border-2 border-purple-800">
      <div className="bg-purple-200 rounded-xl p-2">{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-md m-2 w-full space-y-2">
          {/* <Link
            href="/search"
            className="h-12 bg-gray-100 rounded-2xl w-full flex items-center text-start px-4 text-gray-400"
          >
            Tìm kiếm
          </Link> */}
          <div className="flex flex-col items-center gap-4 justify-center py-8">
            <Logo className="text-6xl" />
            <>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-purple-300 flex-col rounded-2xl p-1 overflow-hidden flex items-center border-2 border-purple-800">
                  <div className="relative w-28 aspect-square">
                    <Image
                      className="rounded-xl shadow-sm"
                      src="/qr-code.svg"
                      alt="Join QR Code"
                      fill
                      priority
                    />
                  </div>
                </div>
                <p className="font-semibold text-purple-800">
                  Quét để tham gia
                </p>
              </div>
            </>
          </div>

          <Card>
            <h3 className="font-semibold text-purple-800">Menu</h3>
            <ul className="flex flex-col gap-4">
              <Link
                href="/lotto/host"
                className="bg-red-500 border-red-800 h-12 select-none active:pb-0.5 text-white pb-1.5 shadow-md transition-[.2s] overflow-hidden border-2 rounded-xl"
              >
                <div className="bg-red-400 flex gap-2 px-2 h-full items-center font-semibold justify-center rounded-b-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>
                  Gọi số
                </div>
              </Link>

              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                    />
                  </svg>
                }
                href="/lotto/ticket"
              >
                Vé dò
              </MenuItem>
              {/* <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>
                }
                href=""
              >
                Gọi số
              </MenuItem> */}
            </ul>
          </Card>
          <p className="text-center font-semibold">Kha &copy; 2024</p>
        </div>
      </div>
      <RegisterPopup />
    </>
  );
}
