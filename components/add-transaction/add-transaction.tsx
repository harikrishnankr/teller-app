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
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/error-message";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Category } from "@/types";
import { CategoryIcon } from "../category-icon";
import { DatePicker } from "../ui/date-picker";
import { format } from "date-fns";

export interface AddTransactionProps {
  open: boolean;
  onOpen: (e: boolean) => void;
  onClose: (e: boolean) => void;
}

interface TransactionForm {
  notes: string;
  category: number;
  date: Date | null;
  amount: string;
  error: {
    notes: string;
    category: string;
    date: string;
    amount: string;
  };
}

export function AddTransaction({ open, onClose, onOpen }: AddTransactionProps) {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [form, setForm] = useState<TransactionForm>({
    category: 0,
    date: new Date(),
    notes: "",
    amount: "",
    error: {
      notes: "",
      category: "",
      date: "",
      amount: "",
    },
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

  const fetchCategories = async () => {
    const response = await fetch("/api/category");
    const categories = await response.json();
    setCategoryList(categories.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getCategoryValue = (categoryId: number) => {
    const categoryObj = categoryList.find((cat) => cat.id === categoryId);
    if (!categoryObj) {
      return "Select Category";
    }
    return (
      <div className="flex items-center gap-2">
        <CategoryIcon
          size="sm"
          icon={categoryObj.icon}
          name={categoryObj.name}
        />
        <span>{categoryObj.name}</span>
      </div>
    );
  };

  const validate = () => {
    setForm({
      ...form,
      error: {
        category: !form.category ? "Category is mandatory" : "",
        notes: "",
        date: !form.date ? "Date is mandatory" : "",
        amount: !form.amount ? "Amount is mandatory" : "",
      },
    });
    return form.category && form.date && form.amount;
  };

  const onSubmit = async () => {
    if (!validate()) {
      return;
    }
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          category: form.category,
          date: format(form.date as Date, "MM/dd/yyyy"),
          notes: form.notes,
          amount: form.amount,
        }),
      });
      const category = await response.json();
      router.refresh();
    } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-description="Create New Category" drawerOnMobile>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Create, and update new transaction
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              onValueChange={(e) =>
                setForm({
                  ...form,
                  category: e as unknown as number,
                })
              }
            >
              <SelectTrigger className="min-w-[185px]">
                {getCategoryValue(form.category)}
              </SelectTrigger>
              <SelectContent>
                {categoryList.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id as unknown as string}
                  >
                    <div className="flex items-center gap-2">
                      <CategoryIcon icon={category.icon} name={category.name} />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorMessage>{form.error.category}</ErrorMessage>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="date">Date</Label>
            <DatePicker
              name="date"
              value={form.date as Date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e,
                })
              }
              disabled={{
                after: new Date()
              }}
            />
            <ErrorMessage>{form.error.date}</ErrorMessage>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                name="amount"
                value={form.amount}
                placeholder="0.00"
                className="text-right w-32"
                onChange={(e) => handleFormChange("amount", e.target.value)}
                required
              />
              <ErrorMessage>{form.error.amount}</ErrorMessage>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Input name="currency" value={"INR"} className="w-20" readOnly />
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label>Note (Optional)</Label>
            <Input
              name="notes"
              value={form.notes}
              placeholder="Write notes"
              onChange={(e) => handleFormChange("notes", e.target.value)}
              required
            />
            <ErrorMessage>{form.error.notes}</ErrorMessage>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Add Transaction</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
