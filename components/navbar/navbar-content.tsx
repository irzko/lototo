export default function NavbarContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="flex justify-center items-center h-full gap-4">{children}</ul>;
}
