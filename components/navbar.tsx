import Link from "next/link";
import HeaderAuth from "./header-auth";
import { NavbarLinks } from "./navbar-links";
import { Logo } from "./logo";

export function Navbar() {
  return (
    <header className="h-16 border-b flex justify-between px-3 bg-white dark:bg-black sticky top-0 left-0 right-0 z-10">
      <Logo />
      <NavbarLinks />
      <HeaderAuth />
    </header>
  );
}
