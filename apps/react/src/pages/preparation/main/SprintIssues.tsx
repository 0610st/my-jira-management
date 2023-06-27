import { FC, useEffect } from "react";
import { useJiraSprintEpics } from "../../../api/hooks";
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

  useEffect(() => {
    if (data) {
      data.issues.forEach((epic) =>
        setPoint({ key: epic.key, point: epic.fields.customfield_10016 || 0 })
      );
    }
  }, [setPoint, data]);

  if (isLoading) {
    return <div />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      {data.issues.map((epic) => (
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
