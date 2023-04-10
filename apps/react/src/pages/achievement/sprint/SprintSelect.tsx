import { Select } from "@mantine/core";
import { FC, useMemo } from "react";
import { useSprints } from "../../../../api/hooks";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

export const SprintSelect: FC<Props> = ({ value, onChange }) => {
  const { data: sprints } = useSprints();

  const data = useMemo(() => {
    if (!sprints) return [];
    return sprints.map((sprint) => ({
      value: sprint.id + "",
      label: sprint.name,
    }));
  }, [sprints]);

  return (
    <Select
      label="Sprints"
      placeholder="Select sprint"
      searchable
      nothingFound="No options"
      maxDropdownHeight={280}
      value={value}
      onChange={onChange}
      data={data}
    />
  );
};
