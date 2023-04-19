import { Flex, ActionIcon, Text, Chip, Loader } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { BsFillCloudSlashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useCreateJiraTask } from "../../../../api/hooks";
import { JiraTaskCreate } from "../../../../types/jira";
import { useNextSprintTime } from "../../../store/useNestSprintTime";
import { useTaskLabels } from "../../../store/useTaskLabels";
import { ItemProps } from "../../../store/useTempTaskItems";
import { NewItem, SprintIssueNewTaskForm } from "./SprintIssueNewTaskForm";

interface Props {
  index: number;
  initalItem: ItemProps;
  execute: boolean;
  sprintId: number;
  epicKey: string;
}
export const SprintIssueNewTaskItem: FC<Props> = ({
  index,
  initalItem,
  execute,
  sprintId,
  epicKey,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [forceSubmit, setForceSubmit] = useState(false);
  const taskLables = useTaskLabels((state) => state.taskLabels);
  const [item, setItem] = useState<NewItem>({
    name: initalItem.name,
    estimatedHour: initalItem.estimatedHour,
    labels: taskLables,
  });
  const [deleted, setDeleted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "executing" | "success" | "error"
  >("idle");
  const { mutate: createTask } = useCreateJiraTask({
    onSuccess: () => {
      setStatus("success");
    },
    onError: (error) => {
      console.error(error);
      setStatus("error");
    },
    onSettled: () => {
      setForceSubmit(false);
    },
  });
  const setTime = useNextSprintTime((state) => state.setTime);
  const removeTime = useNextSprintTime((state) => state.removeTime);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditSubmit = (newItem: NewItem) => {
    setItem(newItem);
    setEditMode(false);
  };

  const handleEditCancel = () => {
    setEditMode(false);
  };

  const toggleDelete = () => {
    setDeleted(!deleted);
  };

  useEffect(() => {
    if (deleted) {
      removeTime(`ADD-${epicKey}-${index}`);
    } else {
      setTime({ key: `ADD-${epicKey}-${index}`, time: item.estimatedHour });
    }
  }, [deleted, item, removeTime, setTime, epicKey, index]);

  useEffect(() => {
    if (execute && status === "idle" && !deleted) {
      if (editMode) {
        setForceSubmit(true);
        return;
      }

      setStatus("executing");
      const params: JiraTaskCreate = {
        estimatedTime: item.estimatedHour,
        name: item.name,
        sprintId: sprintId,
        labels: item.labels,
        parentKey: epicKey,
      };
      createTask(params);
    }
  }, [
    execute,
    status,
    deleted,
    editMode,
    setForceSubmit,
    createTask,
    item,
    epicKey,
    sprintId,
  ]);

  if (editMode) {
    return (
      <SprintIssueNewTaskForm
        initialItem={item}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
        forceSubmit={forceSubmit}
      />
    );
  }

  return (
    <tr>
      <td>
        <Text strikethrough={deleted}>追加</Text>
      </td>
      <td></td>
      <td>
        <Text strikethrough={deleted}>{item.name}</Text>
      </td>
      <td>
        <Text strikethrough={deleted}>{item.estimatedHour}</Text>
      </td>
      <td>
        <Flex wrap="wrap">
          {item.labels.map((label) => (
            <Chip key={label} defaultChecked disabled={deleted}>
              {label}
            </Chip>
          ))}
        </Flex>
      </td>
      <td>
        {status === "idle" ? (
          <Flex sx={{ gap: 24 }} justify="flex-end">
            <ActionIcon
              color="indigo"
              variant="outline"
              onClick={handleEdit}
              disabled={deleted}
            >
              <MdEdit />
            </ActionIcon>
            <ActionIcon
              variant={deleted ? "filled" : "outline"}
              disabled={execute}
              onClick={toggleDelete}
            >
              <BsFillCloudSlashFill />
            </ActionIcon>
          </Flex>
        ) : status === "executing" ? (
          <Flex align="center">
            <Loader size="xs" />
            <Text>作成中...</Text>
          </Flex>
        ) : status === "success" ? (
          <Text>成功</Text>
        ) : (
          <Text>エラー</Text>
        )}
      </td>
    </tr>
  );
};
