import { Box } from "@mantine/core";
import { FC } from "react";
import { useJiraSprintEpics } from "../../../../api/hooks";
import { SprintEpicSelect } from "./SprintEpicSelect";

interface Props {
  sprintId: number;
}

export const SprintEpicSelectContainer: FC<Props> = ({ sprintId }) => {
  const { data } = useJiraSprintEpics(sprintId);
  if (!data) return <></>;

  return (
    <Box>
      {data.issues.map((epic) => (
        <SprintEpicSelect key={epic.key} epic={epic} />
      ))}
    </Box>
  );
};
