import Link from "next/link";
import { cn } from "@/shared/lib";

type NavPost = {
  slug: string;
  title: string;
};

type PostNavProps = {
  prev: NavPost | null;
  next: NavPost | null;
};

const PostNav = ({ prev, next }: PostNavProps) => {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="이전/다음 게시글"
      className="mt-10 border-t border-slate-200/70 pt-6 dark:border-slate-800/70"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Prev */}
        <div className="min-w-0">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className={cn(
                "group block rounded-xl border border-slate-200/70 bg-white px-4 py-3",
                "transition-colors hover:bg-slate-50",
                "dark:border-slate-800/70 dark:bg-slate-950 dark:hover:bg-slate-900/30"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-x-0.5 dark:text-slate-500">
                  ←
                </span>

                <div className="min-w-0">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Previous
                  </div>
                  <div className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    <span className="bg-gradient-to-r from-slate-900 to-slate-900 bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_2px] dark:from-slate-100 dark:to-slate-100">
                      {prev.title}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div aria-hidden className="h-[60px] sm:h-[68px]" />
          )}
        </div>

        {/* Next */}
        <div className="min-w-0">
          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className={cn(
                "group block rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-right",
                "transition-colors hover:bg-slate-50",
                "dark:border-slate-800/70 dark:bg-slate-950 dark:hover:bg-slate-900/30"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Next
                  </div>
                  <div className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    <span className="bg-gradient-to-r from-slate-900 to-slate-900 bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_2px] dark:from-slate-100 dark:to-slate-100">
                      {next.title}
                    </span>
                  </div>
                </div>

                <span className="shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-slate-500">
                  →
                </span>
              </div>
            </Link>
          ) : (
            <div aria-hidden className="h-[60px] sm:h-[68px]" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default PostNav;
