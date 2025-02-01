import * as React from "react";

import { cn } from "@/utils/tw-merge";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "primary" | "secondary" | "search";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "border-border bg-transparent rounded-md focus:border-dark",
      primary:
        "border-border bg-card text-text-muted-foreground rounded-md focus:border-dark",
      secondary: "border-border rounded-[5] focus:border-dark",
      search: "border-muted-foreground placeholder:text-muted rounded-md focus:border-muted",
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border border-border bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
