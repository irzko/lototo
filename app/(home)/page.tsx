"use client";
// import RegisterPopup from "@/components/register-popup";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { tv } from "tailwind-variants";
import dynamic from "next/dynamic";
const RegisterPopup = dynamic(() => import("@/components/join-game-popup"), {
  ssr: false,
});

const menuItem = tv({
  base: "w-full rounded-2xl shadow-sm border flex flex-col bg-white justify-center items-center h-20",
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
    <Link href={href} className={menuItem({ className })}>
      {icon}
      {children}
    </Link>
  );
};

export default function Page() {
  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-md m-2 w-full space-y-2">
          <Link
            href="/search"
            className="h-12 bg-gray-100 rounded-2xl w-full flex items-center text-start px-4 text-gray-400"
          >
            Tìm kiếm
          </Link>
          <>
            <div className="flex flex-col items-center space-y-2">
              <div className="relative w-56 aspect-square">
                <Image
                  className="rounded-2xl border shadow-sm"
                  src="/qr-code.svg"
                  alt="Join QR Code"
                  fill
                  priority
                />
              </div>
              <p className="font-semibold text-sky-900">Quét để tham gia</p>
            </div>
          </>
          <div className="rounded-2xl p-2 bg-white space-y-2 shadow-sm border">
            <h3 className="font-semibold text-sky-900">Lô tô Offline</h3>
            <hr />

            <ul className="grid grid-cols-2 gap-2">
              <MenuItem
                className="hover:bg-gray-100 font-semibold text-sky-900 transition-colors"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>
                }
                href="/lotto/host"
              >
                Gọi số
              </MenuItem>
              <MenuItem
                className="hover:bg-gray-100 font-semibold text-sky-900 transition-colors"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
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
            </ul>
          </div>
        </div>
      </div>
      <RegisterPopup />
    </>
  );
}
