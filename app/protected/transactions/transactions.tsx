"use client";

import AddTransaction from "@/components/add-transaction";
import { CategoryIcon } from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Heading } from "@/components/ui/heading";
import { utcToLocal } from "@/lib/utils";
import { Transaction } from "@/types";
import { format, startOfMonth, toDate } from "date-fns";
import { SquarePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "./loading";
import { useProtectedState } from "@/state/ProtectedContext";

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
  const [loading, setIsLoading] = useState(true);
  const { state } = useProtectedState();

  const onClose = (event: boolean) => {
    setOpenTransaction(event);
  };

  const onOpen = (event: boolean) => {
    setOpenTransaction(event);
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const resp: Response = await fetch(
        `/api/protected/transactions?from=${format(filter.from, "MM/dd/yyyy")}&to=${format(filter.to, "MM/dd/yyyy")}`
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
      setIsLoading(false);
      setTransactions(newTransactions);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const deleteTransaction = async (id?: number) => {
    if (!id) {
      return;
    }
    try {
      const response = await fetch("/api/protected/transactions", {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ ids: [id] }),
      });
      const category = await response.json();
      if (!category.error) {
        fetchTransactions();
      }
    } catch {}
  };

  useEffect(() => {
    fetchTransactions();
  }, [filter, state.transactionRefreshToken]);

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
      {loading && <Loader />}
      <div>
        {transactions.map(({ transaction, type, date }, idx) =>
          type === "heading" ? (
            <div
              className="mb-3 pt-5 border-t first:border-none text-[#324c5b]"
              key={`heading_${idx}`}
            >
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
              <div className="hidden md:block">{transaction?.notes}</div>
              <div className="flex gap-1 items-center text-destructive font-semibold">
                <span>{transaction?.amount}</span>
                <span>{transaction?.currency}</span>
                <div className="ml-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteTransaction(transaction?.id)}
                  >
                    <Trash className="text-red-600" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {!transactions.length && !loading && (
        <div className="my-6 flex justify-center items-center">
          <span>No Transactions</span>
        </div>
      )}
    </>
  );
}
