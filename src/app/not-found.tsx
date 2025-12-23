import Link from "next/link";
import { ArrowUpLeftIcon } from "@heroicons/react/24/outline";
import { cn } from "@/shared/lib";

const NotFound = () => {
  return (
    <div className="flex-center min-h-[60vh]">
      <div className="flex w-full flex-col gap-4">
        <section className="mb-4 space-y-2">
          <h1 className="text-5xl font-bold tracking-tight underline decoration-slate-400 decoration-2 underline-offset-8 dark:decoration-slate-600 md:text-7xl">
            Not Found
          </h1>
          <p className="w-[50%] text-sm text-slate-600 dark:text-slate-400 md:w-[40%]">
            This page might have been removed or moved to a different URL.
          </p>
        </section>

        <Link
          href="/"
          className={cn(
            "group inline-flex items-center gap-1 self-end text-sm font-medium text-slate-700",
            "transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
          )}
        >
          <ArrowUpLeftIcon className="h-3 w-3 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
