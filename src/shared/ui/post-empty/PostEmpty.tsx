const PostListEmpty = () => {
  return (
    <li className="flex gap-6 py-6">
      <div className="w-[92px] shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="rounded-xl px-4 py-3">
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            아직 게시된 글이 없어요.
          </p>
        </div>
      </div>
    </li>
  );
};

export default PostListEmpty;
