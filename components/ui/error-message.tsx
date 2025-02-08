import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ErrorMessageProps {
  className?: string;
  children: ReactNode;
}

export function ErrorMessage({
  className,
  children,
  ...props
}: ErrorMessageProps) {
  return (
    <p
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}
