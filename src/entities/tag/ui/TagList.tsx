import TagItem from "./TagItem";
import { getAllTagsWithCount } from "../api/tag.api";

const TagList = async () => {
  const tags = await getAllTagsWithCount();

  return (
    <section className="not-prose">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <TagItem key={tag.id} tag={tag} />
        ))}
      </div>
    </section>
  );
};

export default TagList;
