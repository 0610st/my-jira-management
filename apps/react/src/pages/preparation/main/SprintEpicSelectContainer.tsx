import { Box } from "@mantine/core";
import { FC } from "react";
import { useJiraSprintEpics } from "../../../api/hooks";
import { useNestSprintFetchOption } from "../../../store/useNestSprintFetchOption";
import { SprintEpicSelect } from "./SprintEpicSelect";

interface Props {
  sprintId: number;
}

export const SprintEpicSelectContainer: FC<Props> = ({ sprintId }) => {
  const open = useNestSprintFetchOption((state) => state.open);
  const { data } = useJiraSprintEpics(sprintId, open);
  if (!data) return <div />;

  return (
    <Box>
      {data.issues.map((epic) => (
        <SprintEpicSelect key={epic.key} epic={epic} />
      ))}
    </Box>
  );
};
