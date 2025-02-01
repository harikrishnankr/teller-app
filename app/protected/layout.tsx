import HeaderAuth from "@/components/header-auth";
import { Sidebar } from "@/components/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <section className="flex-1 flex flex-col">
        <header className="h-16 border-b border-[#ebebeb] flex justify-end px-3">
          <HeaderAuth />
        </header>
        <div className="bg-[#f8f8f8] flex-1 dark:bg-black px-3 pt-3 overflow-auto">
          {children}
        </div>
      </section>
    </main>
  );
}
