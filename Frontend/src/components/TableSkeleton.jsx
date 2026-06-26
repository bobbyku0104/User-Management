import React from "react";

function TableSkeleton() {
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="w-full animate-pulse">
      {/* Header skeleton */}
      <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 bg-slate-100 rounded-t-xl border-b border-slate-200">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4 justify-self-end"></div>
      </div>

      {/* Rows skeleton */}
      <div className="divide-y divide-slate-100 border border-slate-100 border-t-0 rounded-b-xl overflow-hidden bg-white">
        {skeletonRows.map((row) => (
          <div key={row} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 md:px-6 md:py-4 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 md:hidden"></div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
            <div className="hidden md:block">
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
            <div className="flex items-center gap-2 md:justify-end mt-2 md:mt-0">
              <div className="h-8 bg-slate-200 rounded-lg w-16"></div>
              <div className="h-8 bg-slate-200 rounded-lg w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableSkeleton;
