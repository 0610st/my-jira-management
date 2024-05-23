import { FC, useEffect } from "react";
import { useJiraSprintEpics } from "../../../api/hooks";
import { useNextSprintFetchOption } from "../../../store/useNextSprintFetchOption";
import { useNextSprintPoint } from "../../../store/useNextSprintPoint";
import { SprintIssueItem } from "./SprintIssueItem";

interface Props {
  sprintId: number;
  execute: boolean;
}

export const SprintIssues: FC<Props> = ({ sprintId, execute }) => {
  const open = useNextSprintFetchOption((state) => state.open);
  const { data, isLoading, error } = useJiraSprintEpics(sprintId, open, {
    staleTime: 0,
  });
  const setPoint = useNextSprintPoint((state) => state.setPoint);

  useEffect(() => {
    if (data) {
      data.body.issues.forEach((epic) =>
        setPoint({ key: epic.key, point: epic.fields.customfield_10016 || 0 }),
      );
    }
  }, [setPoint, data]);

  if (isLoading) {
    return <div />;
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return <div>error raise</div>;
  }

  return (
    <>
      {data.body.issues.map((epic) => (
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
