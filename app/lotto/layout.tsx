import React from "react";
import MyTicketButton from "@/components/my-ticket/my-ticket-button";
import NavBar from "@/components/navbar";
import NavbarBrand from "@/components/navbar/navbar-brand";
import Logo from "@/components/logo";
import NavbarContent from "@/components/navbar/navbar-content";
import NavbarItem from "@/components/navbar/navbar-item";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar>
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <MyTicketButton />
          </NavbarItem>
        </NavbarContent>
      </NavBar>
      <main className="mt-16">{children}</main>
    </>
  );
}
