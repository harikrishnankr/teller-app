"use client";

import { IconList } from "@/components/icon-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { AddCategoryForm, AddCategoryProps } from "./types";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/error-message";

export function AddCategory({ open, data, onClose, onOpen }: AddCategoryProps) {
  const router = useRouter();
  const [form, setForm] = useState<AddCategoryForm>({
    icon: "",
    categoryName: "",
    categoryNameError: "",
    iconError: "",
  });

  const onOpenChange = (event: boolean) => {
    event ? onOpen(event) : onClose(event);
  };

  const handleFormChange = (attr: string, value: string) => {
    setForm({
      ...form,
      [attr]: value,
    });
  };

  const onSubmit = async () => {
    const errorMessage = {
      iconError: "",
      categoryNameError: "",
    };
    if (!form.icon) {
      errorMessage.iconError = "Please select an Icon";
    }
    if (!form.categoryName) {
      errorMessage.categoryNameError = "Please enter a category name";
    }
    if (errorMessage.iconError || errorMessage.categoryNameError) {
      setForm({
        ...form,
        ...errorMessage,
      });
      return;
    } else {
      setForm({
        ...form,
        ...errorMessage,
      });
    }
    const url = data ? `/api/protected/category/${data.id}` : "/api/protected/category";
    try {
      const response = await fetch(url, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({ icon: form.icon, name: form.categoryName }),
      });
      const category = await response.json();
      if (!category.error) {
        router.refresh();
        onOpenChange(false);
      }
    } catch {}
  };

  useEffect(() => {
    if (data) {
      setForm({
        icon: data.icon,
        categoryName: data.name,
        categoryNameError: "",
        iconError: "",
      });
    }
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="Create New Category" drawerOnMobile>
        <DialogHeader>
          <DialogTitle>
            {!data ? "Create New Category" : "Edit Category"}
          </DialogTitle>
          <DialogDescription>
            Create, Update, and Delete categories
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 flex-col">
          <div>
            <IconList
              value={form.icon}
              onChange={(e) => handleFormChange("icon", e)}
            />
            <ErrorMessage>{form.iconError}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label>Category Name</Label>
            <Input
              name="categoryName"
              value={form.categoryName}
              placeholder="New Category Name"
              onChange={(e) => handleFormChange("categoryName", e.target.value)}
              required
            />
            <ErrorMessage>{form.categoryNameError}</ErrorMessage>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
