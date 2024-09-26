import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center bg-muted/40">
      <div className="flex flex-col w-2/3 sm:gap-4 sm:py-4">
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Skeleton className="rounded-xl h-[200px] w-full" />
        </div>
      </div>
    </div>
  );
}
