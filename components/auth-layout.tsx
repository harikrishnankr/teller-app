import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import HeaderAuth from "@/components/header-auth";
import { Logo } from "./logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
            <Logo />
            <div className="flex gap-2">
              <ThemeSwitcher />
              <HeaderAuth />
            </div>
          </div>
        </nav>
        <div className="flex flex-col gap-20 max-w-7xl p-5">
          <div className="max-w-7xl flex flex-col gap-12 items-start">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
