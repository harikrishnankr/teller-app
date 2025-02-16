import { serverFetch } from "@/utils/server-fetch";
import { CategoryList } from "./category";
import { Category } from "@/types";

export default async function CategoryPage() {
  const data = await serverFetch(process.env.BASE_URL + "/api/category", {
    method: "GET",
    cache: "no-store"
  });
  let categories: { data: Category[] } = await data.json();

  return (
    <section className="rounded-xl bg-card text-card-foreground shadow-sm p-6">
      <CategoryList categories={categories.data} />
    </section>
  );
}
