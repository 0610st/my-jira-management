import { Flex, Loader, Switch, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCreateSprintWithIssuesFromJira } from "../../../../api/hooks";
import {
  CreateSprintWithIssuesFromJira,
  SprintValue,
} from "../../../../types/sprint";
import { useSprintImportPipe } from "../../../store/useSprintImportPipe";

interface ActionBodyProps {
  status: "idle" | "executing" | "success" | "error" | "skip";
  sprintChecked: boolean;
  storyChecked: boolean;
  taskChecked: boolean;
  onClickSprint: () => void;
  onClickStory: () => void;
  onClickTack: () => void;
  disabled: boolean;
  sprintId: number;
}

const ActionBody: FC<ActionBodyProps> = ({
  status,
  sprintChecked,
  storyChecked,
  taskChecked,
  onClickSprint,
  onClickStory,
  onClickTack,
  disabled,
  sprintId,
}) => {
  if (status === "idle") {
    return (
      <Flex gap={8} wrap="wrap">
        <Switch
          onLabel="sprint"
          offLabel="sprint"
          checked={sprintChecked}
          onChange={onClickSprint}
          disabled={disabled}
        />
        <Switch
          onLabel="tasks"
          offLabel="tasks"
          checked={taskChecked}
          onChange={onClickTack}
          disabled={disabled}
        />
        <Switch
          onLabel="stories"
          offLabel="stories"
          checked={storyChecked}
          onChange={onClickStory}
          disabled={disabled}
        />
      </Flex>
    );
  }
  if (status === "executing") {
    return (
      <Flex align="center">
        <Loader size="xs" />
        <Text>取込中...</Text>
      </Flex>
    );
  }

  if (status === "success") {
    return (
      <Text component={Link} to={`/sprint/${sprintId}`}>
        成功
      </Text>
    );
  }

  if (status === "skip") {
    return <Text>Skip</Text>;
  }

  return <Text>エラー</Text>;
};

interface UnimportTableRowProps {
  data: SprintValue;
}

export const UnimportTableRow: FC<UnimportTableRowProps> = ({ data }) => {
  const [isImport, setIsImport] = useState(true);
  const [withTasks, setWithTasks] = useState(true);
  const [withStories, setWithStories] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "executing" | "success" | "error" | "skip"
  >("idle");
  const currentId = useSprintImportPipe((state) => state.currentId);
  const nextStep = useSprintImportPipe((state) => state.nextStep);
  const { mutate: createSprint } = useCreateSprintWithIssuesFromJira({
    onSuccess: () => {
      setStatus("success");
      nextStep();
    },
    onError: () => {
      setStatus("error");
    },
  });

  const handleSprintChange = () => {
    setIsImport(!isImport);
  };

  const handleTasksChange = () => {
    setWithTasks(!withTasks);
  };

  const handleStoriesChange = () => {
    setWithStories(!withStories);
  };

  useEffect(() => {
    if (!isImport) {
      setWithTasks(false);
      setWithStories(false);
    }
  }, [isImport]);

  useEffect(() => {
    if (currentId === data.id && status === "idle") {
      if (!isImport) {
        setStatus("skip");
        nextStep();
        return;
      }
      setStatus("executing");
      const params: CreateSprintWithIssuesFromJira = {
        sprintId: data.id,
        withTasks,
        withStories,
      };
      createSprint(params);
    }
  }, [
    currentId,
    nextStep,
    status,
    withTasks,
    withStories,
    isImport,
    data.id,
    createSprint,
  ]);

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.startDate.toString()}</td>
      <td>{data.endDate.toString()}</td>
      <td>
        <ActionBody
          status={status}
          sprintChecked={isImport}
          storyChecked={withStories}
          taskChecked={withTasks}
          onClickSprint={handleSprintChange}
          onClickStory={handleStoriesChange}
          onClickTack={handleTasksChange}
          disabled={currentId !== data.id}
          sprintId={data.id}
        />
      </td>
    </tr>
  );
};
