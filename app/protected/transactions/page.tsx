import { Transactions } from "./transactions";

export default async function TransactionsPage() {
  return (
    <section className="rounded-xl bg-card text-card-foreground shadow-sm p-6">
      <Transactions />
    </section>
  );
}
