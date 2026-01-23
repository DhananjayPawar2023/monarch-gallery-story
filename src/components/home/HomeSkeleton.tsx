import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-6 max-w-4xl mx-auto py-20 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-16 md:h-24 w-3/4 mx-auto" />
          <Skeleton className="h-16 md:h-24 w-2/3 mx-auto" />
        </div>
        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        <Skeleton className="h-6 w-3/4 max-w-xl mx-auto" />
        <div className="flex gap-4 justify-center pt-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </div>
  );
}

export function CollectionSkeleton() {
  return (
    <div className="container mx-auto px-6 py-24 md:py-32">
      <div className="mb-16 space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-12 w-2/3 max-w-xl" />
        <Skeleton className="h-5 w-full max-w-3xl" />
        <Skeleton className="h-5 w-3/4 max-w-2xl" />
      </div>

      <div className="bg-secondary/30 border border-border/50 p-8 md:p-12 rounded-sm mb-14 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {[1, 2, 3].map((i) => (
          <ArtworkCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ArtworkCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-square w-full rounded-sm" />
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function ArtistSpotlightSkeleton() {
  return (
    <div className="bg-secondary/20 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-64" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Skeleton className="aspect-square w-full rounded-sm" />
          
          <div className="space-y-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <div className="border-l-2 border-accent pl-6 space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <Skeleton className="h-12 w-36" />
          </div>
        </div>

        <div className="mt-16 space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <ArtworkCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <CollectionSkeleton />
      <ArtistSpotlightSkeleton />
    </>
  );
}
