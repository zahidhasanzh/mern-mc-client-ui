import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
const ProductListSkeleton = () => {
  return (
    <section>
      <div className="container py-12">
        <div className="flex gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-md" />
          ))}
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListSkeleton;