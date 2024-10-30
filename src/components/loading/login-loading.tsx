import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoginLoading() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="flex flex-col gap-2">
        <Skeleton className="h-6 w-80" />
        <Skeleton className="h-6 w-80" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-6 w-full" />
          </div>

          <Skeleton className="h-10 w-full" />

          <Skeleton className="mx-auto h-6 w-[200px]" />
        </div>
      </CardContent>
    </Card>
  );
}
