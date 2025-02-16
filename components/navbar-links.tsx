"use client";

import { NavbarRoutes } from "@/constants";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import AddTransaction from "./add-transaction";

export function NavbarLinks() {
  const pathname = usePathname();
  const [openTransaction, setOpenTransaction] = useState(false);

  const onClose = (event: boolean) => {
    setOpenTransaction(event);
  };

  const onOpen = (event: boolean) => {
    setOpenTransaction(event);
  };

  return (
    <>
      {openTransaction && (
        <AddTransaction
          open={openTransaction}
          onClose={onClose}
          onOpen={onOpen}
        />
      )}
      <div className="fixed bottom-0 left-0 right-0 flex h-16 bg-white dark:bg-black border-t gap-2 md:justify-between md:h-auto md:static">
        {NavbarRoutes.map((route) => (
          <Fragment key={route.link}>
            {route.label ? (
              <div className={`flex flex-1 md:flex-auto`}>
                <Link
                  className={`flex items-center gap-1 flex-col justify-center md:flex-row md:gap-2 md:justify-between w-full px-0 md:px-4 relative after:content-[''] after:h-[3px] after:absolute after:left-0 after:bottom-0 after:w-full ${pathname === route.link ? "text-primary dark:text-white after:bg-primary" : "text-[#7b93a4] after:bg-transparent"}`}
                  href={route.link}
                >
                  <route.icon className="block md:hidden" size={20} />
                  <span className="text-xs sm:text-sm md:text-base">
                    {route.label}
                  </span>
                </Link>
              </div>
            ) : (
              <div className={`flex items-center md:hidden`}>
                <button
                  onClick={() => onOpen(true)}
                  className="h-10 w-10 flex justify-center items-center bg-primary dark:bg-foreground text-primary-foreground rounded-full"
                >
                  <Plus />
                </button>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}
