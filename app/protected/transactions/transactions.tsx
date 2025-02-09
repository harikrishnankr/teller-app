"use client";

import AddTransaction from "@/components/add-transaction";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { SquarePlus } from "lucide-react";
import { useState } from "react";

export function Transactions() {
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
      <Heading
        actions={
          <>
            <Button className="flex gap-2" onClick={() => onOpen(true)}>
              <SquarePlus size={14} />
              Add Transaction
            </Button>
          </>
        }
      >
        Transactions
      </Heading>
    </>
  );
}
