import Link from "next/link";
import { cn } from "@/shared/lib";
import { TagWithCount } from "@/entities/tag/model";
import VisitorStatsServer from "@/widgets/visitor/VisitorStatsServer";

const CategorySidebar = ({ tags }: { tags: TagWithCount[] }) => {
  return (
    <div className="sticky top-28 space-y-0 text-sm">
      <VisitorStatsServer />
      <div className="rounded-xl border border-neutral-200 p-5 transition-colors dark:border-neutral-800">
        <ul className="space-y-2">
          {tags.map((tag) => (
            <CategorySidebarItem key={tag.id} tag={tag} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;

const CategorySidebarItem = ({ tag }: { tag: TagWithCount }) => {
  return (
    <li key={tag.id}>
      <Link
        href={`/tags/${tag.slug}`}
        className={cn(
          "block w-full items-center rounded-md px-2 py-1 text-left text-neutral-700 transition-colors",
          "hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        )}
      >
        <span className="mr-1 after:ml-1 after:text-neutral-400 after:content-['·'] dark:after:text-neutral-600">
          {tag.name}
        </span>
        <span className="text-xs text-neutral-500">({tag.postCount})</span>
      </Link>
    </li>
  );
};
