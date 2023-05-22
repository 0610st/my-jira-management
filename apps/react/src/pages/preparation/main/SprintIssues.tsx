import { FC, useEffect } from "react";
import { useJiraSprintEpics } from "../../../../api/hooks";
import { useExcludeEpics } from "../../../store/useExcludeEpics";
import { useNestSprintFetchOption } from "../../../store/useNestSprintFetchOption";
import { useNestSprintPoint } from "../../../store/useNestSprintPoint";
import { SprintIssueItem } from "./SprintIssueItem";

interface Props {
  sprintId: number;
  execute: boolean;
}

export const SprintIssues: FC<Props> = ({ sprintId, execute }) => {
  const open = useNestSprintFetchOption((state) => state.open);
  const { data, isLoading, error } = useJiraSprintEpics(sprintId, open);
  const setPoint = useNestSprintPoint((state) => state.setPoint);
  const excludeEpics = useExcludeEpics((state) => state.excludeEpics);

  useEffect(() => {
    if (data) {
      data.issues.forEach((epic) =>
        setPoint({ key: epic.key, point: epic.fields.customfield_10016 || 0 })
      );
    }
  }, [setPoint, data]);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      {data.issues
        .filter((epic) => !excludeEpics.includes(epic.key))
        .map((epic) => (
          <SprintIssueItem
            key={epic.key}
            epic={epic}
            execute={execute}
            sprintId={sprintId}
          />
        ))}
    </>
  );
};
