import { ActionIcon, Chip, Flex, MultiSelect } from "@mantine/core";
import { FC, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
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
  const [labels, setLabels] = useState(taskLabels);
  const [labelData, setLabelData] = useState(
    taskLabels.map((label) => ({ label: label, value: label }))
  );
  const [editMode, setEditMode] = useState(false);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <tr key={task.key}>
      <td>{task.key}</td>
      <td>{task.fields.summary}</td>
      <td>{task.fields.timespent}</td>
      {/* TODO:　見積もり時間ではないので修正する */}
      <td>
        {editMode ? (
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
        ) : (
          <Flex w={150} sx={{ gap: 4 }} wrap="wrap">
            {labels.map((label) => (
              <Chip checked size="xs">
                {label}
              </Chip>
            ))}
          </Flex>
        )}
      </td>
      <td>
        {editMode ? (
          <ActionIcon color="indigo" variant="filled" onClick={toggleEdit}>
            <BsCheck />
          </ActionIcon>
        ) : (
          <ActionIcon color="indigo" variant="outline" onClick={toggleEdit}>
            <MdEdit />
          </ActionIcon>
        )}
      </td>
    </tr>
  );
};
