export default function NavBar({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <nav className="flex z-40 border-b w-full items-center justify-center h-16 fixed top-0 inset-x-0 bg-white">
        <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-16 max-w-[1024px]">
          {children}
        </header>
      </nav>
    </>
  );
}
