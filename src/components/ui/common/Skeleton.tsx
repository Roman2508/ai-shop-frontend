import { cn } from "@/utils/tw-merge";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-[10px] bg-border", className)} {...props} />;
}

export { Skeleton };