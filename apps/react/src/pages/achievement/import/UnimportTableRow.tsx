import { Flex, Loader, Switch, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCreateSprintWithIssuesFromJira } from "../../../../api/hooks";
import {
  CreateSprintWithIssuesFromJira,
  SprintValue,
} from "../../../../types/sprint";

interface Props {
  data: SprintValue;
  execute: boolean;
}

export const UnimportTableRow: FC<Props> = ({ data, execute }) => {
  const [isImport, setIsImport] = useState(true);
  const [withTasks, setWithTasks] = useState(true);
  const [withStories, setWithStories] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "executing" | "success" | "error" | "skip"
  >("idle");
  const { mutate: createSprint } = useCreateSprintWithIssuesFromJira({
    onSuccess: () => {
      setStatus("success");
    },
    onError: (error) => {
      console.error(error);
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
    if (execute && status === "idle") {
      if (!isImport) {
        setStatus("skip");
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
  }, [execute, status]);

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.startDate.toString()}</td>
      <td>{data.endDate.toString()}</td>
      <td>
        {status === "idle" ? (
          <Flex gap={8} wrap="wrap">
            <Switch
              onLabel="sprint"
              offLabel="sprint"
              checked={isImport}
              onChange={handleSprintChange}
              disabled={execute}
            />
            <Switch
              onLabel="tasks"
              offLabel="tasks"
              checked={withTasks}
              onChange={handleTasksChange}
              disabled={execute}
            />
            <Switch
              onLabel="stories"
              offLabel="stories"
              checked={withStories}
              onChange={handleStoriesChange}
              disabled={execute}
            />
          </Flex>
        ) : status === "executing" ? (
          <Flex align="center">
            <Loader size="xs" />
            <Text>取込中...</Text>
          </Flex>
        ) : status === "success" ? (
          <Text component={Link} to={`/sprint/${data.id}`}>
            成功
          </Text>
        ) : status === "skip" ? (
          <Text>Skip</Text>
        ) : (
          <Text>エラー</Text>
        )}
      </td>
    </tr>
  );
};
