export default function AdminLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-56 bg-[#E2C2C6]/40 dark:bg-white/10 rounded-xl animate-pulse" />
          <div className="h-4 w-80 bg-[#E2C2C6]/30 dark:bg-white/5 rounded-lg mt-2 animate-pulse" />
        </div>
        <div className="h-10 w-40 bg-[#E2C2C6]/30 dark:bg-white/5 rounded-xl animate-pulse hidden sm:block" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#E2C2C6]/40 dark:bg-white/10 animate-pulse" />
              <div className="h-6 w-14 rounded-lg bg-[#E2C2C6]/30 dark:bg-white/5 animate-pulse" />
            </div>
            <div className="h-3 w-20 rounded bg-[#E2C2C6]/30 dark:bg-white/5 animate-pulse mb-2" />
            <div className="h-7 w-28 rounded-lg bg-[#E2C2C6]/40 dark:bg-white/10 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
          <div className="h-5 w-40 rounded bg-[#E2C2C6]/40 dark:bg-white/10 animate-pulse mb-6" />
          <div className="h-52 rounded-xl bg-[#E2C2C6]/20 dark:bg-white/5 animate-pulse" />
        </div>
        <div className="bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
          <div className="h-5 w-32 rounded bg-[#E2C2C6]/40 dark:bg-white/10 animate-pulse mb-6" />
          <div className="h-52 rounded-full bg-[#E2C2C6]/20 dark:bg-white/5 animate-pulse mx-auto w-52" />
        </div>
      </div>
    </div>
  );
}
