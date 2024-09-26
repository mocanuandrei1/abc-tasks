import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center h-[90vh] gap-4 items-center">
      <h1>Diagrama</h1>
      <div className="flex gap-10">
        <Skeleton className="rounded-xl h-[664px] w-[550px]" />
        <Skeleton className="rounded-xl h-[664px] w-[550px]" />
      </div>
    </div>
  );
}
