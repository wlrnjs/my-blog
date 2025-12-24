import Link from "next/link";
import { Post } from "@/shared/supabase/supabase";
import { cn, formatDateKoreanYMD } from "@/shared/lib";

const PostItem = ({ post }: { post: Post }) => {
  return (
    <li className="group border-b border-slate-200/70 py-5 last:border-b-0 dark:border-slate-800/70">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex gap-6">
          <div className="w-[92px] shrink-0 pt-0.5">
            <time
              dateTime={post.published_at}
              className="text-xs font-medium text-slate-500 dark:text-slate-400"
            >
              {formatDateKoreanYMD(post.published_at)}
            </time>
          </div>

          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-slate-100">
              <span
                className={cn(
                  "bg-gradient-to-r from-slate-900 to-slate-900 bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1",
                  "transition-[background-size] duration-300 group-hover:bg-[length:100%_2px] dark:from-slate-100 dark:to-slate-100"
                )}
              >
                {post.title}
              </span>
            </h2>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {post.description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
