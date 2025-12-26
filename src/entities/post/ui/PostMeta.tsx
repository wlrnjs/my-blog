import { formatDateKoreanYMD } from "@/shared/lib";

type PostMetaProps = {
  publishedAt: string;
  tags: string[];
};

const PostMeta = ({ publishedAt, tags }: PostMetaProps) => {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
      <time dateTime={publishedAt}>{formatDateKoreanYMD(publishedAt)}</time>
    </div>
  );
};

export default PostMeta;
