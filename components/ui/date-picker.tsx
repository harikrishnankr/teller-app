"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Matcher } from "react-day-picker";

interface DatePickerProps {
  value: Date;
  onChange: (e: Date) => void;
  name?: string;
  disabled?: Matcher;
}

export function DatePicker(props: DatePickerProps) {
  const { value, onChange, name, disabled } = props;
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(value ?? undefined);
  }, [value]);

  const onDateChange = (e: Date | undefined) => {
    setDate(e);
    onChange(e as Date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          name={name}
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          autoFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
