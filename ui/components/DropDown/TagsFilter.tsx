import { useFilterStore } from "@/store/filter-store";

interface props {
  handleTagChange: (tag: string) => void;
  selectedTags : string[]
}

export const RenderTags = ({ handleTagChange, selectedTags }: props) => {
  const { tags  } = useFilterStore();
  const tagsPerRow = [11, 8, 10];
  const rows: string[][] = [];
  let startIndex = 0;

  tagsPerRow.forEach((count) => {
    const rowTags = tags.slice(startIndex, startIndex + count);
    rows.push(rowTags);
    startIndex += count;
  });

  if (startIndex < tags.length) {
    rows.push(tags.slice(startIndex));
  }

  return rows.map((rowTags, rowIndex) => (
    <div
      key={rowIndex}
      className="flex flex-wrap gap-2 justify-center mb-2 w-full"
    >
      {rowTags.map((tag, index) => (
        <div
          key={index}
          onClick={() => handleTagChange(tag)}
          className={`cursor-pointer p-1 rounded-3xl border border-gray-700 min-w-24 font-bold flex items-center justify-center text-gray-400 text-sm hover:text-gray-800 hover:bg-blue-500 ${
            selectedTags.includes(tag)
              ? "bg-blue-500 text-gray-950 font-mono font-bold"
              : "font-mono"
          }`}
        >
          {tag}
        </div>
      ))}
    </div>
  ));
};
