import { Loader } from "@mantine/core";
import { FC, useEffect } from "react";
import { useJiraEpicTasks } from "../../../api/hooks";
import { useNestSprintFetchOption } from "../../../store/useNestSprintFetchOption";
import { useNextSprintTime } from "../../../store/useNestSprintTime";
import { useTempTaskEpics } from "../../../store/useTempTaskEpics";
import { useTempTaskItems } from "../../../store/useTempTaskItems";
import { SprintIssueNewTaskItem } from "./SprintIssueNewTaskItem";
import { SprintIssueTaskItem } from "./SprintIssueTaskItem";

interface Props {
  epicKey: string;
  execute: boolean;
  sprintId: number;
}

export const SprintIssueTaskBody: FC<Props> = ({
  epicKey,
  execute,
  sprintId,
}) => {
  const open = useNestSprintFetchOption((state) => state.open);
  const { data, isLoading, error } = useJiraEpicTasks(epicKey, open, 0);
  const tempItems = useTempTaskItems((state) => state.items);
  const setTime = useNextSprintTime((state) => state.setTime);
  const tempTaskEpics = useTempTaskEpics((state) => state.tempTaskEpics);

  useEffect(() => {
    if (data) {
      data.body.issues.forEach((task) => {
        const time = task.fields.timetracking.remainingEstimateSeconds
          ? task.fields.timetracking.remainingEstimateSeconds / 60 / 60
          : 0;
        setTime({
          key: task.key,
          parent: epicKey,
          time,
        });
      });
    }
  }, [setTime, data, epicKey]);

  if (isLoading) {
    return (
      <tr>
        <td colSpan={100}>
          <Loader />
        </td>
      </tr>
    );
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (
      <tr>
        <td colSpan={100}>error raise</td>
      </tr>
    );
  }

  return (
    <>
      {data.body.issues.map((task) => (
        <SprintIssueTaskItem
          key={task.key}
          task={task}
          epicKey={epicKey}
          execute={execute}
          sprintId={sprintId}
        />
      ))}
      {tempTaskEpics.includes(epicKey) &&
        tempItems
          .filter((item) => !item.deleted)
          .map((item, index) => (
            <SprintIssueNewTaskItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              initalItem={item}
              execute={execute}
              sprintId={sprintId}
              epicKey={epicKey}
            />
          ))}
    </>
  );
};
