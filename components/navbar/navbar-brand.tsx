export default function NavbarBrand({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full flex items-center">{children}</div>;
}
