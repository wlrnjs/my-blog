import { formatDateKoreanYMD } from "@/shared/lib";

type PostMetaData = {
  publishedAt: string;
  readingTime: number;
};

type PostMetaProps = {
  tags: string[];
  data: PostMetaData;
};

const PostMeta = ({ tags, data }: PostMetaProps) => {
  const { publishedAt, readingTime } = data;

  return (
    <div className="flex flex-wrap justify-end gap-2 text-sm text-neutral-500 dark:text-neutral-400">
      <time dateTime={publishedAt}>{formatDateKoreanYMD(publishedAt)}</time>
      <span>{readingTime} min read</span>
    </div>
  );
};

export default PostMeta;
