import { ReactNode } from "react";

export function Heading({
  children,
  actions,
}: {
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-4 flex justify-between items-center">
      <h1>{children}</h1>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
