import { Lobster } from "next/font/google";
import Link from "next/link";

const lobster = Lobster({ weight: "400", subsets: ["latin"] });

export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <nav className="flex z-40 border-b w-full items-center justify-center h-16 fixed top-0 inset-x-0 backdrop-blur-lg backdrop-saturate-150 bg-white/70">
        <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-16 max-w-[1024px]">
          <div className="h-full flex items-center">
            <Link
              href="/"
              className={`${lobster.className} font-bold text-2xl`}
            >
              Lôtôtô
            </Link>
          </div>
          {children}
        </header>
      </nav>
    </>
  );
}
