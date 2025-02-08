"use client";

import { Heading } from "@/components/ui/heading";
import { AddCategory } from "./add-category";
import { Button } from "@/components/ui/button";
import { SquarePlus, Trash } from "lucide-react";
import { CategoryItems } from "./category-items";
import { CategoryListProps } from "./types";
import { useState } from "react";

export function CategoryList({ categories }: CategoryListProps) {
  const [openAddCategory, setOpenCategoryStatus] = useState<boolean>(false);

  const onClose = (event: boolean) => {
    setOpenCategoryStatus(event);
  };

  const onOpen = (event: boolean) => {
    setOpenCategoryStatus(event);
  };

  return (
    <>
      {openAddCategory && (
        <AddCategory open={openAddCategory} onClose={onClose} onOpen={onOpen} />
      )}
      <Heading
        actions={
          <>
            <Button
              size="sm"
              className="flex gap-2"
              onClick={() => setOpenCategoryStatus(true)}
            >
              <SquarePlus size={14} />
              <span className="hidden md:inline">Create New Category</span>
            </Button>
            <Button variant="destructive" size="sm" className="flex gap-2">
              <Trash size={14} />
              <span className="hidden md:inline">Delete Categories</span>
            </Button>
          </>
        }
      >
        Manage Categories
      </Heading>
      <CategoryItems list={categories || []} />
    </>
  );
}
