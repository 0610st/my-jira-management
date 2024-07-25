import { Box } from "@mantine/core";
import { FC } from "react";
import { SprintEpicSelect } from "./SprintEpicSelect";
import { useNextSprintFetchOption } from "@/store/useNextSprintFetchOption";
import { useJiraSprintEpics } from "@/api/hooks";

interface Props {
  sprintId: number;
}

export const SprintEpicSelectContainer: FC<Props> = ({ sprintId }) => {
  const open = useNextSprintFetchOption((state) => state.open);
  const { data } = useJiraSprintEpics(sprintId, open);
  if (!data) return <div />;

  return (
    <Box>
      {data.body.issues.map((epic) => (
        <SprintEpicSelect key={epic.key} epic={epic} />
      ))}
    </Box>
  );
};
