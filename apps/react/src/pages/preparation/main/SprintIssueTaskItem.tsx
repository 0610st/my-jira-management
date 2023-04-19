import { MultiSelect } from "@mantine/core";
import { FC, useState } from "react";
import { TaskIssue } from "../../../../types/task";
import { useTaskLabels } from "../../../store/useTaskLabels";

interface Props {
  task: {
    key: string;
    fields: TaskIssue;
  };
}

export const SprintIssueTaskItem: FC<Props> = ({ task }) => {
  const taskLabels = useTaskLabels((state) => state.taskLabels);
  const [labels, setLabels] = useState([...task.fields.labels, ...taskLabels]);
  const [labelData, setLabelData] = useState(
    labels.map((label) => ({ label: label, value: label }))
  );

  return (
    <tr key={task.key}>
      <td>{task.key}</td>
      <td>{task.fields.summary}</td>
      <td>{task.fields.timespent}</td>
      {/* TODO:　見積もり時間ではないので修正する */}
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
      <td></td>
    </tr>
  );
};
