import { FC } from "react";
import { Anchor, Box, Flex, Switch } from "@mantine/core";
import { useExcludeEpics } from "@/store/useExcludeEpics";
import { useTempTaskEpics } from "@/store/useTempTaskEpics";
import { EpicIssue } from "@/types/epic";

interface Props {
  epic: {
    key: string;
    fields: EpicIssue;
  };
}

export const SprintEpicSelect: FC<Props> = ({ epic }) => {
  const excludeEpics = useExcludeEpics((state) => state.excludeEpics);
  const toggleExcludeEpic = useExcludeEpics((state) => state.toggleExcludeEpic);
  const tempTaskEpics = useTempTaskEpics((state) => state.tempTaskEpics);
  const toggleTempTaskEpic = useTempTaskEpics(
    (state) => state.toggleTempTaskEpic,
  );

  return (
    <Box mt={8}>
      <Anchor href={`#${epic.key}`} fz="sm">
        {epic.fields.summary}
      </Anchor>
      <Flex sx={{ gap: 24 }}>
        <Switch
          onLabel="除外"
          offLabel="除外"
          checked={excludeEpics.includes(epic.key)}
          onChange={() => toggleExcludeEpic(epic.key)}
        />
        <Switch
          onLabel="基本タスクセット"
          offLabel="基本タスクセット"
          checked={tempTaskEpics.includes(epic.key)}
          onChange={() => toggleTempTaskEpic(epic.key)}
        />
      </Flex>
    </Box>
  );
};
