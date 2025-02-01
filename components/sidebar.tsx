"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Routes = [
  {
    link: "/protected/dashboard",
    label: "Dashboard",
  },
  {
    link: "/protected/record",
    label: "Record",
  },
  {
    link: "/protected/category",
    label: "Category",
  },
  {
    link: "/protected/settings",
    label: "Settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 px-3 border-r border-[#ebebeb] hidden md:block">
      <div className="h-16 flex items-center">
        <div className="flex gap-5 items-center font-bold text-2xl">
          <Link href={"/"} className="text-[#383dfe]">
            Teller
          </Link>
        </div>
      </div>
      <div className="mt-3">
        {Routes.map((route) => (
          <div key={route.link}>
            <Link
              className={`rounded-md w-full py-2 px-3 mb-4 inline-block ${pathname === route.link ? "bg-[#383dfe] text-white" : ""}`}
              href={route.link}
            >
              {route.label}
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
}
