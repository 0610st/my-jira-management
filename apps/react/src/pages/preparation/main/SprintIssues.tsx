import { FC } from "react";
import { useJiraSprintEpics } from "../../../../api/hooks";
import { SprintIssueItem } from "./SprintIssueItem";

interface Props {
  sprintId: number;
}

export const SprintIssues: FC<Props> = ({ sprintId }) => {
  const { data, isLoading, error } = useJiraSprintEpics(sprintId);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    <>{error.message}</>;
  }

  return (
    <>
      {data!.issues.map((epic) => (
        <SprintIssueItem key={epic.key} epic={epic} />
      ))}
    </>
  );
};
