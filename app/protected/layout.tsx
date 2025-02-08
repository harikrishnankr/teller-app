import HeaderAuth from "@/components/header-auth";
import { Navbar } from "@/components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex">
      <section className="flex-1 flex flex-col">
        <Navbar />
        <div className="bg-background flex-1 dark:bg-black px-3 pt-3 overflow-auto mb-[70px] md:mb-0">
          {children}
        </div>
      </section>
    </main>
  );
}
