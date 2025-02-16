"use client";

import AddTransaction from "@/components/add-transaction";
import { CategoryIcon } from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Heading } from "@/components/ui/heading";
import { utcToLocal } from "@/lib/utils";
import { Transaction } from "@/types";
import { format, startOfMonth, toDate } from "date-fns";
import { SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

interface TransactionUi {
  type: "heading" | "transaction";
  transaction: Transaction | null;
  date: string | null;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<TransactionUi[]>([]);
  const [openTransaction, setOpenTransaction] = useState(false);
  const firstDayOfMonth = startOfMonth(new Date());
  const [filter, setFilter] = useState({
    from: new Date(format(firstDayOfMonth, "MM/dd/yyyy")),
    to: new Date(),
  });

  const onClose = (event: boolean) => {
    setOpenTransaction(event);
  };

  const onOpen = (event: boolean) => {
    setOpenTransaction(event);
  };

  const fetchTransactions = async () => {
    try {
      const resp: Response = await fetch(
        `/api/transactions?from=${format(filter.from, "MM/dd/yyyy")}&to=${format(filter.to, "MM/dd/yyyy")}`
      );
      if (!resp.ok) {
        throw new Error(`Failed to fetch transactions: ${resp.statusText}`);
      }
      const { data }: { data: Transaction[] } = await resp.json();
      let currentDate = "";
      const newTransactions: TransactionUi[] = [];
      data.forEach((transaction) => {
        const formattedDate = utcToLocal(transaction.date);
        if (currentDate !== formattedDate) {
          currentDate = formattedDate;
          newTransactions.push({
            type: "heading",
            date: formattedDate,
            transaction: null,
          });
        }
        newTransactions.push({
          type: "transaction",
          date: null,
          transaction,
        });
      });
      setTransactions(newTransactions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

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
            <DateRangePicker
              value={{ from: filter.from, to: filter.to }}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  from: e.from as Date,
                  to: e.to as Date,
                })
              }
            />
            <Button
              className="hidden md:flex gap-2"
              onClick={() => onOpen(true)}
            >
              <SquarePlus size={14} />
              <span>Add Transaction</span>
            </Button>
          </>
        }
      >
        Transactions
      </Heading>
      <div>
        {transactions.map(({ transaction, type, date }, idx) =>
          type === "heading" ? (
            <div className="mb-3 pt-5 border-t first:border-none text-[#324c5b]" key={`heading_${idx}`}>
              <span className="font-semibold">{date}</span>
            </div>
          ) : (
            <div
              key={transaction?.id}
              className="flex justify-between gap-4 mb-4"
            >
              <div className="flex gap-3 items-center">
                <CategoryIcon
                  icon={transaction?.categories.icon as string}
                  name={transaction?.categories.name as string}
                />
                {transaction?.categories.name}
              </div>
              <div>{transaction?.notes}</div>
              <div className="flex gap-1 text-destructive font-semibold">
                <span>{transaction?.amount}</span>
                <span>{transaction?.currency}</span>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
