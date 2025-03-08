"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bolt, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CategoryExtra,
  CategoryItemsProps,
  EditCategory,
} from "./types";
import { CategoryIcon } from "@/components/category-icon";
import { useRouter } from "next/navigation";
import { AddCategory } from "./add-category";
import { Category } from "@/types";

export function CategoryItems({ list }: CategoryItemsProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryExtra[]>(
    list as CategoryExtra[]
  );
  const [editCategory, setEditCategory] = useState<EditCategory | null>(null);

  useEffect(() => {
    setCategories(list as CategoryExtra[]);
  }, [list]);

  const deleteCategory = async (id: number) => {
    try {
      const response = await fetch("/api/protected/category", {
        method: "DELETE",
        cache: "no-store",
        body: JSON.stringify({ ids: [id] }),
      });
      const category = await response.json();
      if (!category.error) {
        router.refresh();
      }
    } catch {}
  };

  const onClose = () => setEditCategory(null);

  const onEdit = (item: Category) =>
    setEditCategory({
      icon: item.icon,
      id: item.id,
      name: item.name,
    });

  return (
    <>
      {editCategory && (
        <AddCategory
          open={!!editCategory}
          data={editCategory}
          onClose={onClose}
          onOpen={onClose}
        />
      )}
      <div className="flex flex-wrap justify-between">
        {categories?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between mb-3 w-full md:w-[45%]"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                disabled={!item.user_id}
                checked={item.checked}
                className="w-5 h-5"
              />
              <CategoryIcon icon={item.icon} name={item.name} />
              <div className="text-ellipsis">{item.name}</div>
            </div>
            <div className="flex justify-between gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Bolt className="text-primary" size={14} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!item.user_id}
                onClick={() => deleteCategory(item.id)}
              >
                <Trash className="text-red-600" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
