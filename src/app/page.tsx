import Link from "next/link";
import { getAllPosts } from "@/entities/post/api/api";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post) => (
        <article key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  );
}
