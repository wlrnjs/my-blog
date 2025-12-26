import Link from "next/link";
import Image from "next/image";
import { cn, formatDateKoreanYMD } from "@/shared/lib";

type PostCardItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  published_at: string | null;
  featured_image: string | null;
};

type RelatedPostsProps = {
  posts: PostCardItem[];
  hrefBase?: string;
};

const PostCard = ({ post, hrefBase }: { post: PostCardItem; hrefBase: string }) => {
  const hasImage = Boolean(post.featured_image);
  const dateText = post.published_at ? formatDateKoreanYMD(post.published_at) : null;

  return (
    <article
      aria-labelledby={`post-title-${post.id}`}
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200/70 bg-white",
        "transition-colors hover:bg-slate-50",
        "dark:border-slate-800/70 dark:bg-slate-950 dark:hover:bg-slate-900/30"
      )}
    >
      <Link
        href={`${hrefBase}/${post.slug}`}
        aria-label={`게시글: ${post.title}`}
        className="group block h-full"
      >
        {hasImage && (
          <figure className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
            <Image
              src={post.featured_image!}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              width={1200}
              height={675}
              loading="lazy"
            />
            <div className="from-black/45 pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent" />
          </figure>
        )}

        <div className={cn(hasImage ? "px-4 pb-4 pt-3" : "px-4 py-4")}>
          <header>
            <h3
              id={`post-title-${post.id}`}
              className="text-sm font-semibold leading-snug text-slate-900 dark:text-slate-100"
            >
              <span className="line-clamp-2">{post.title}</span>
            </h3>
          </header>

          {post.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {post.description}
            </p>
          )}

          {dateText && (
            <footer className="mt-4">
              <time
                dateTime={post.published_at!}
                className="text-xs text-slate-500 dark:text-slate-400"
              >
                {dateText}
              </time>
            </footer>
          )}
        </div>
      </Link>
    </article>
  );
};

const RelatedPosts = ({ posts, hrefBase = "/posts" }: RelatedPostsProps) => {
  if (!posts.length) return null;

  return (
    <section
      aria-labelledby="related-posts-title"
      className="mt-14 border-t border-slate-200/70 pt-6 dark:border-slate-800/70"
    >
      <header className="mb-4 flex items-end justify-between">
        <h2
          id="related-posts-title"
          className="text-base font-semibold text-slate-900 dark:text-slate-100"
        >
          관련 게시글
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">{posts.length}개</p>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id} className="min-w-0">
            <PostCard post={post} hrefBase={hrefBase} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedPosts;
