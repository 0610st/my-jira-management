import { MultiSelect } from "@mantine/core";
import { useState } from "react";
import { useTaskLabels } from "@/store/useTaskLabels";

export const TaskLabelMultiSelect = () => {
  const taskLabels = useTaskLabels((state) => state.taskLabels);
  const setTaskLabels = useTaskLabels((state) => state.setTaskLabels);
  const [taskItems, setTaskItems] = useState(
    taskLabels.map((label) => ({ label, value: label })),
  );

  return (
    <MultiSelect
      label="ストーリー基本ラベル"
      data={taskItems}
      value={taskLabels}
      searchable
      creatable
      clearable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        setTaskItems((current) => [...current, item]);
        return item;
      }}
      onChange={(value) => setTaskLabels(value)}
    />
  );
};
