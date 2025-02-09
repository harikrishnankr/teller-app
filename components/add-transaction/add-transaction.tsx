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

export interface AddTransactionProps {
  open: boolean;
  onOpen: (e: boolean) => void;
  onClose: (e: boolean) => void;
}

interface TransactionForm {
  notes: string;
  error: {
    notes: string;
  };
}

export function AddTransaction({ open, onClose, onOpen }: AddTransactionProps) {
  const router = useRouter();
  const [form, setForm] = useState<TransactionForm>({
    notes: "",
    error: {
      notes: "",
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

  const onSubmit = async () => {};

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
