export default function NavbarItem({
  children,
  isActive = false,
}: {
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return <li>{children}</li>;
}
