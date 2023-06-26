import { Flex, ActionIcon, Text, Chip, Loader } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { BsFillCloudSlashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useCreateJiraTask } from "../../../api/hooks";
import { JiraTaskCreate } from "../../../types/jira";
import { useNextSprintTime } from "../../../store/useNestSprintTime";
import { useTaskLabels } from "../../../store/useTaskLabels";
import { ItemProps } from "../../../store/useTempTaskItems";
import { NewItem, SprintIssueNewTaskForm } from "./SprintIssueNewTaskForm";

interface ActionBodyProps {
  status: "idle" | "executing" | "success" | "error" | "skip";
  onClickEdit: () => void;
  onClickDelete: () => void;
  editDisabled: boolean;
  deleteDisabled: boolean;
  deleteVariant: "filled" | "outline";
}

const ActionBody: FC<ActionBodyProps> = ({
  status,
  onClickEdit,
  onClickDelete,
  editDisabled,
  deleteDisabled,
  deleteVariant,
}) => {
  if (status === "idle") {
    return (
      <Flex sx={{ gap: 24 }} justify="flex-end">
        <ActionIcon
          color="indigo"
          variant="outline"
          onClick={onClickEdit}
          disabled={editDisabled}
        >
          <MdEdit />
        </ActionIcon>
        <ActionIcon
          variant={deleteVariant}
          disabled={deleteDisabled}
          onClick={onClickDelete}
        >
          <BsFillCloudSlashFill />
        </ActionIcon>
      </Flex>
    );
  }
  if (status === "executing") {
    return (
      <Flex align="center">
        <Loader size="xs" />
        <Text>作成中...</Text>
      </Flex>
    );
  }

  if (status === "success") {
    return <Text>成功</Text>;
  }

  return <Text>エラー</Text>;
};

interface SprintIssueNewTaskItemProps {
  index: number;
  initalItem: ItemProps;
  execute: boolean;
  sprintId: number;
  epicKey: string;
}
export const SprintIssueNewTaskItem: FC<SprintIssueNewTaskItemProps> = ({
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
    onError: () => {
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
    setTime({
      key: `ADD-${epicKey}-${index}`,
      parent: epicKey,
      time: item.estimatedHour,
    });
    return () => {
      removeTime(`ADD-${epicKey}-${index}`);
    };
  }, [setTime, removeTime, epicKey, index, item.estimatedHour]);

  useEffect(() => {
    if (deleted) {
      removeTime(`ADD-${epicKey}-${index}`);
    } else {
      setTime({
        key: `ADD-${epicKey}-${index}`,
        parent: epicKey,
        time: item.estimatedHour,
      });
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
        sprintId,
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
      <td />
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
        <ActionBody
          status={status}
          onClickEdit={handleEdit}
          onClickDelete={toggleDelete}
          editDisabled={deleted}
          deleteDisabled={execute}
          deleteVariant={deleted ? "filled" : "outline"}
        />
      </td>
    </tr>
  );
};
