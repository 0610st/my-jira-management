import { ActionIcon, Flex, Loader, MultiSelect, Text } from "@mantine/core";
import { FC, useCallback, useEffect, useState } from "react";
import { BsFillCloudSlashFill } from "react-icons/bs";
import { UpdateJiraTaskProps, useUpdateJiraTask } from "../../../../api/hooks";
import { TaskIssue } from "../../../../types/task";
import { useNextSprintTime } from "../../../store/useNestSprintTime";
import { useTaskLabels } from "../../../store/useTaskLabels";
import { IssueLink } from "../../../components/link/IssueLink";

interface ActionBodyProps {
  status: "idle" | "executing" | "success" | "error" | "skip";
  onClick: () => void;
  disabled: boolean;
  variant: "filled" | "outline";
}

const ActionBody: FC<ActionBodyProps> = ({
  status,
  onClick,
  disabled,
  variant,
}) => {
  if (status === "idle") {
    return (
      <Flex sx={{ gap: 24 }} justify="flex-end">
        <ActionIcon variant={variant} disabled={disabled} onClick={onClick}>
          <BsFillCloudSlashFill />
        </ActionIcon>
      </Flex>
    );
  }
  if (status === "skip") {
    return <div />;
  }
  if (status === "executing") {
    return (
      <Flex align="center">
        <Loader size="xs" />
        <Text>更新中...</Text>
      </Flex>
    );
  }
  if (status === "success") {
    return <Text>成功</Text>;
  }
  return <Text>エラー</Text>;
};

interface SprintIssueTaskItemProps {
  task: {
    key: string;
    fields: TaskIssue;
  };
  epicKey: string;
  execute: boolean;
  sprintId: number;
}

export const SprintIssueTaskItem: FC<SprintIssueTaskItemProps> = ({
  task,
  epicKey,
  execute,
  sprintId,
}) => {
  const [exclude, setExclude] = useState(false);
  const taskLabels = useTaskLabels((state) => state.taskLabels);
  const [labels, setLabels] = useState(
    Array.from(new Set([...task.fields.labels, ...taskLabels]))
  );
  const [labelData, setLabelData] = useState(
    labels.map((label) => ({ label, value: label }))
  );
  const [status, setStatus] = useState<
    "idle" | "executing" | "success" | "error"
  >("idle");
  const { mutate: updateTask } = useUpdateJiraTask({
    onSuccess: () => {
      setStatus("success");
    },
    onError: () => {
      setStatus("error");
    },
  });
  const setTime = useNextSprintTime((state) => state.setTime);
  const removeTime = useNextSprintTime((state) => state.removeTime);

  const toggleExclude = useCallback(() => {
    if (exclude) {
      const time = task.fields.timetracking.remainingEstimateSeconds
        ? task.fields.timetracking.remainingEstimateSeconds / 60 / 60
        : 0;
      setTime({
        key: task.key,
        parent: epicKey,
        time,
      });
    } else {
      removeTime(task.key);
    }
    setExclude((prev) => !prev);
  }, [
    epicKey,
    exclude,
    removeTime,
    setTime,
    task.fields.timetracking.remainingEstimateSeconds,
    task.key,
  ]);

  useEffect(() => {
    const time = task.fields.timetracking.remainingEstimateSeconds
      ? task.fields.timetracking.remainingEstimateSeconds / 60 / 60
      : 0;
    setTime({ key: task.key, parent: epicKey, time });
    return () => {
      removeTime(task.key);
    };
  }, [setTime, removeTime, task, epicKey]);

  useEffect(() => {
    if (execute && status === "idle" && !exclude) {
      setStatus("executing");
      const params: UpdateJiraTaskProps = {
        key: task.key,
        body: {
          sprintId,
          labels,
        },
      };
      updateTask(params);
    }
  }, [exclude, execute, labels, sprintId, status, task.key, updateTask]);

  return (
    <tr key={task.key}>
      <td>
        <IssueLink issueId={task.key} color="dimmed">
          {task.key}
        </IssueLink>
      </td>
      <td>{task.fields.status.name}</td>
      <td>{task.fields.summary}</td>
      <td>
        {task.fields.timetracking.originalEstimateSeconds
          ? task.fields.timetracking.originalEstimateSeconds / 60 / 60
          : ""}
      </td>
      <td>
        <MultiSelect
          data={labelData}
          value={labels}
          searchable
          creatable
          clearable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setLabelData((current) => [...current, item]);
            return item;
          }}
          onChange={(value) => setLabels(value)}
        />
      </td>
      <td>
        <ActionBody
          status={status}
          onClick={toggleExclude}
          variant={exclude ? "filled" : "outline"}
          disabled={execute}
        />
      </td>
    </tr>
  );
};
