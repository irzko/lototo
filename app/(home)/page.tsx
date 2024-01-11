import Link from "next/link";
import React from "react";
import { tv } from "tailwind-variants";

const menuItem = tv({
  base: "w-full rounded-2xl shadow-sm border flex flex-col bg-white justify-center items-center aspect-square",
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
    <div className="flex justify-center">
      <div className="max-w-md m-2 w-full space-y-2">
        <Link
          href="/search"
          className="h-12 bg-gray-100 rounded-2xl w-full flex items-center text-start px-4 text-gray-400"
        >
          Tìm kiếm
        </Link>
        <div className="divide-y rounded-2xl bg-white shadow-sm border">
          <h3 className="font-semibold px-4 py-2 text-gray-900">Lôtôtô</h3>
          <ul className="grid grid-cols-3 gap-4 p-4">
            <MenuItem
              className="bg-red-500 text-white hover:bg-red-600 transition-colors"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              }
              href="/lotto/host"
            >
              Gọi số
            </MenuItem>
            <MenuItem
              className="hover:bg-gray-100 transition-colors"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
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
  );
}
