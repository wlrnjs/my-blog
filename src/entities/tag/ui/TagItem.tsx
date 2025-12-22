import Link from "next/link";
import { TagWithCount } from "../api/tag.api";

const TagItem = ({ tag }: { tag: TagWithCount }) => {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      className="group block rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight">#{tag.name}</h2>

        <span
          className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          aria-label={`${tag.postCount} posts`}
        >
          {tag.postCount}
        </span>
      </div>

      {tag.description && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
          {tag.description}
        </p>
      )}

      <div className="mt-3 text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
        View posts →
      </div>
    </Link>
  );
};

export default TagItem;
