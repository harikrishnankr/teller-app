import AuthLayout from "@/components/auth-layout";

export default async function Home() {
  return (
    <AuthLayout>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Plan your budget and track your expenses</h2>
      </main>
    </AuthLayout>
  );
}
