import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonForm() {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-12 pb-12 gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-25 m-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-25 m-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-40 m-auto" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-50 m-auto" />
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="mt-4"></div>
      <Skeleton className="h-8 w-24" />
    </div>
  );
}
