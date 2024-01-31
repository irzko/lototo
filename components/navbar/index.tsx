export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <nav className="flex z-40 border-b-2 border-purple-800 w-full items-center justify-center pb-1 fixed top-0 inset-x-0 bg-purple-300">
        <header className="z-40 bg-purple-200 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-16 max-w-[1024px]">
          {children}
        </header>
      </nav>
    </>
  );
}
