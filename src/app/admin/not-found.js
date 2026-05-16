import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#610F7F] to-[#9C528B] flex items-center justify-center mx-auto mb-6 shadow-2xl">
        <span className="text-white font-serif font-bold text-4xl">4</span>
      </div>
      <h1 className="font-serif text-3xl font-bold text-[#2F0147] dark:text-white mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-[#9C528B]/60 dark:text-white/40 text-sm mb-8 max-w-sm">
        The admin page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}
