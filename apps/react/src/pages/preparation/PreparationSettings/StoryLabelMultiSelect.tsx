import { MultiSelect } from "@mantine/core";
import { useState } from "react";
import { useStoryLabels } from "@/store/useStoryLabels";

export const StoryLabelMultiSelect = () => {
  const storyLabels = useStoryLabels((state) => state.storyLabels);
  const setStoryLabels = useStoryLabels((state) => state.setStoryLabels);
  const [storyItems, setStoryItems] = useState(
    storyLabels.map((label) => ({
      label,
      value: label,
    })),
  );

  return (
    <MultiSelect
      label="ストーリー基本ラベル"
      data={storyItems}
      value={storyLabels}
      searchable
      creatable
      clearable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        setStoryItems((current) => [...current, item]);
        return item;
      }}
      onChange={(value) => setStoryLabels(value)}
    />
  );
};
