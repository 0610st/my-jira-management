import { Flex, ActionIcon, Text, Chip } from "@mantine/core";
import { FC, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useTaskLabels } from "../../../store/useTaskLabels";
import { ItemProps } from "../../../store/useTempTaskItems";
import { NewItem, SprintIssueNewTaskForm } from "./SprintIssueNewTaskForm";

interface Props {
  initalItem: ItemProps;
}
export const SprintIssueNewTaskItem: FC<Props> = ({ initalItem }) => {
  const [editMode, setEditMode] = useState(false);
  const taskLables = useTaskLabels((state) => state.taskLabels);
  const [item, setItem] = useState<NewItem>({
    name: initalItem.name,
    estimatedHour: initalItem.estimatedHour,
    labels: taskLables,
  });
  const [deleted, setDeleted] = useState(false);

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

  const handleDelete = () => {
    setDeleted(!deleted);
  };

  if (editMode) {
    return (
      <SprintIssueNewTaskForm
        initialItem={item}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
      />
    );
  }

  return (
    <tr>
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
            onClick={handleDelete}
          >
            <BsTrashFill />
          </ActionIcon>
        </Flex>
      </td>
    </tr>
  );
};
