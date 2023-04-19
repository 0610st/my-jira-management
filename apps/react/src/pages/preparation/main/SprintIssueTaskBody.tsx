import { Loader } from "@mantine/core";
import { FC } from "react";
import { useJiraEpicTasks } from "../../../../api/hooks";
import { useTempTaskItems } from "../../../store/useTempTaskItems";
import { SprintIssueNewTaskItem } from "./SprintIssueNewTaskItem";
import { SprintIssueTaskItem } from "./SprintIssueTaskItem";

interface Props {
  epicKey: string;
}

export const SprintIssueTaskBody: FC<Props> = ({ epicKey }) => {
  const { data, isLoading, error } = useJiraEpicTasks(epicKey);
  const tempItems = useTempTaskItems((state) => state.items);

  console.log(tempItems);

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
    return (
      <tr>
        <td colSpan={100}>{error.message}</td>
      </tr>
    );
  }

  return (
    <>
      {data.issues.map((task) => (
        <SprintIssueTaskItem key={task.key} task={task} />
      ))}
      {tempItems
        .filter((item) => !item.deleted)
        .map((item, index) => (
          <SprintIssueNewTaskItem key={index} initalItem={item} />
        ))}
    </>
  );
};
