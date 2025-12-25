import Link from "next/link";
import { cn } from "@/shared/lib";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";

type NavPost = {
  slug: string;
  title: string;
};

type PostNavProps = {
  prev: NavPost | null;
  next: NavPost | null;
};

type NavItemProps = {
  direction: "prev" | "next";
  post: NavPost;
};

const NavItem = ({ direction, post }: NavItemProps) => {
  const isPrev = direction === "prev";

  return (
    <Link
      href={`/posts/${post.slug}`}
      aria-label={`${isPrev ? "이전" : "다음"} 게시글: ${post.title}`}
      className={cn(
        "group block rounded-xl border border-slate-200/70 bg-white px-4 py-3",
        "transition-colors hover:bg-slate-50",
        "dark:border-slate-800/70 dark:bg-slate-950 dark:hover:bg-slate-900/30"
      )}
    >
      <div className={cn("flex items-center gap-3", !isPrev && "flex-row-reverse")}>
        <span
          className={cn(
            "shrink-0 text-slate-400 transition-transform duration-300 dark:text-slate-500",
            isPrev ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
          )}
        >
          {isPrev ? (
            <ArrowLongLeftIcon className="h-4 w-4" />
          ) : (
            <ArrowLongRightIcon className="h-4 w-4" />
          )}
        </span>

        <div className={cn("min-w-0 flex-1", !isPrev && "text-right")}>
          <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {isPrev ? "Previous" : "Next"}
          </div>
          <div className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
            <span
              className={cn(
                "bg-gradient-to-r from-slate-900 to-slate-900 bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1",
                "transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]",
                "dark:from-slate-100 dark:to-slate-100"
              )}
            >
              {post.title}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
const NAV_PLACEHOLDER_CLASS = "h-[60px] sm:h-[68px]";

type NavSlotProps = {
  direction: "prev" | "next";
  post: NavPost | null;
};

const NavSlot = ({ direction, post }: NavSlotProps) => {
  return (
    <div className="min-w-0">
      {post ? (
        <NavItem direction={direction} post={post} />
      ) : (
        <div aria-hidden className={NAV_PLACEHOLDER_CLASS} />
      )}
    </div>
  );
};

const PostNav = ({ prev, next }: PostNavProps) => {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="이전/다음 게시글"
      className="mt-10 border-t border-slate-200/70 pt-6 dark:border-slate-800/70"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NavSlot direction="prev" post={prev} />
        <NavSlot direction="next" post={next} />
      </div>
    </nav>
  );
};

export default PostNav;
