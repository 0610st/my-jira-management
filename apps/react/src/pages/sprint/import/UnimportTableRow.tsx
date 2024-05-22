import { Flex, Loader, Switch, Text } from "@mantine/core";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCreateSprintWithIssuesFromJira } from "../../../api/hooks";
import { SprintValue } from "../../../types/sprint";
import { useSprintImportPipe } from "../../../store/useSprintImportPipe";

type Status = "idle" | "executing" | "success" | "error" | "skip";

interface ActionBodyProps {
  status: Status;
  sprintChecked: boolean;
  storyChecked: boolean;
  taskChecked: boolean;
  onClickSprint: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickStory: () => void;
  onClickTack: () => void;
  successLink: string;
}

const ActionBody: FC<ActionBodyProps> = ({
  status,
  sprintChecked,
  storyChecked,
  taskChecked,
  onClickSprint,
  onClickStory,
  onClickTack,
  successLink,
}) => {
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
      <Text component={Link} to={successLink}>
        成功
      </Text>
    );
  }

  if (status === "skip") {
    return <Text>Skip</Text>;
  }

  if (status === "error") {
    return <Text>エラー</Text>;
  }

  return (
    <Flex gap={8} wrap="wrap">
      <Switch
        onLabel="sprint"
        offLabel="sprint"
        checked={sprintChecked}
        onChange={onClickSprint}
      />
      <Switch
        onLabel="tasks"
        offLabel="tasks"
        checked={taskChecked}
        onChange={onClickTack}
        disabled={!sprintChecked}
      />
      <Switch
        onLabel="stories"
        offLabel="stories"
        checked={storyChecked}
        onChange={onClickStory}
        disabled={!sprintChecked}
      />
    </Flex>
  );
};

interface UnimportTableRowProps {
  data: SprintValue;
}

export const UnimportTableRow: FC<UnimportTableRowProps> = ({ data }) => {
  const [active, setActive] = useState(true);
  const [withTasks, setWithTasks] = useState(true);
  const [withStories, setWithStories] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
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

  const toggleActive = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setActive(checked);
    setWithTasks(checked);
    setWithStories(checked);
  }, []);

  const toggleWithTasks = useCallback(() => {
    setWithTasks((prev) => !prev);
  }, []);

  const toggleWithStories = useCallback(() => {
    setWithStories((prev) => !prev);
  }, []);

  useEffect(() => {
    if (currentId === data.id && status === "idle") {
      if (!active) {
        setStatus("skip");
        nextStep();
        return;
      }
      setStatus("executing");
      const body = {
        sprintId: data.id,
        withTasks,
        withStories,
      };
      createSprint({ body });
    }
  }, [
    currentId,
    nextStep,
    status,
    withTasks,
    withStories,
    active,
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
          sprintChecked={active}
          storyChecked={withStories}
          taskChecked={withTasks}
          onClickSprint={toggleActive}
          onClickStory={toggleWithStories}
          onClickTack={toggleWithTasks}
          successLink={`/sprint/${data.id}`}
        />
      </td>
    </tr>
  );
};
