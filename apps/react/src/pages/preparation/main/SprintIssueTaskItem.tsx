import { ActionIcon, Flex, Loader, MultiSelect, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { BsFillCloudSlashFill } from "react-icons/bs";
import { UpdateJiraTaskProps, useUpdateJiraTask } from "../../../../api/hooks";
import { TaskIssue } from "../../../../types/task";
import { useTaskLabels } from "../../../store/useTaskLabels";

interface Props {
  task: {
    key: string;
    fields: TaskIssue;
  };
  execute: boolean;
  sprintId: number;
}

export const SprintIssueTaskItem: FC<Props> = ({ task, execute, sprintId }) => {
  const [exclude, setExclude] = useState(false);
  const taskLabels = useTaskLabels((state) => state.taskLabels);
  const [labels, setLabels] = useState(
    Array.from(new Set([...task.fields.labels, ...taskLabels]))
  );
  const [labelData, setLabelData] = useState(
    labels.map((label) => ({ label: label, value: label }))
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

  const toggleExclude = () => {
    setExclude((prev) => !exclude);
  };

  useEffect(() => {
    if (execute && status === "idle" && !exclude) {
      setStatus("executing");
      const params: UpdateJiraTaskProps = {
        key: task.key,
        body: {
          sprintId: sprintId,
          labels: labels,
        },
      };
      updateTask(params);
    }
  }, [execute, status]);

  return (
    <tr key={task.key}>
      <td>{task.key}</td>
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
