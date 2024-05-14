import React, { PropsWithChildren } from "react";
import { cn } from "~fnStore/utils/cn";
interface Props {
  className?: string;
}
export default function Button({ className, children }: PropsWithChildren<Props>) {
  return (
    <button
      type="button"
      className={cn(
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
        className,
      )}
    >
      {children}
    </button>
  );
}
