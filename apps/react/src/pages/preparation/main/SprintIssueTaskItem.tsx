import { ActionIcon, Flex, Loader, MultiSelect, Text } from "@mantine/core";
import { FC, useCallback, useEffect, useState } from "react";
import { BsFillCloudSlashFill } from "react-icons/bs";
import { UpdateJiraTaskProps, useUpdateJiraTask } from "../../../../api/hooks";
import { TaskIssue } from "../../../../types/task";
import { useNextSprintTime } from "../../../store/useNestSprintTime";
import { useTaskLabels } from "../../../store/useTaskLabels";

interface Props {
  task: {
    key: string;
    fields: TaskIssue;
  };
  epicKey: string;
  execute: boolean;
  sprintId: number;
}

export const SprintIssueTaskItem: FC<Props> = ({
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
    onError: (error) => {
      console.error(error);
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
  }, [exclude, removeTime, setTime]);

  useEffect(() => {
    const time = task.fields.timetracking.remainingEstimateSeconds
      ? task.fields.timetracking.remainingEstimateSeconds / 60 / 60
      : 0;
    setTime({ key: task.key, parent: epicKey, time });
    return () => {
      removeTime(task.key);
    };
  }, [setTime, removeTime, task]);

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
  }, [execute, status]);

  return (
    <tr key={task.key}>
      <td>{task.key}</td>
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
        {status === "idle" ? (
          <Flex sx={{ gap: 24 }} justify="flex-end">
            <ActionIcon
              variant={exclude ? "filled" : "outline"}
              disabled={execute}
              onClick={toggleExclude}
            >
              <BsFillCloudSlashFill />
            </ActionIcon>
          </Flex>
        ) : status === "executing" ? (
          <Flex align="center">
            <Loader size="xs" />
            <Text>更新中...</Text>
          </Flex>
        ) : status === "success" ? (
          <Text>成功</Text>
        ) : status === "error" ? (
          <Text>エラー</Text>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};
