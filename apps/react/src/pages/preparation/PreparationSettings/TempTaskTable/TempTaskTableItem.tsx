import { Flex, ActionIcon, Text } from "@mantine/core";
import { FC, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import {
  ItemProps,
  useTempTaskItems,
} from "../../../../store/useTempTaskItems";
import { TempTaskTableForm } from "./TempTaskTableForm";

interface Props {
  index: number;
  item: ItemProps;
}
export const TempTaskTableItem: FC<Props> = ({ index, item }) => {
  const [editMode, setEditMode] = useState(false);
  const replaceItem = useTempTaskItems((state) => state.replaceItem);
  const removeItem = useTempTaskItems((state) => state.removeItem);
  const resurrectItem = useTempTaskItems((state) => state.resurrectItem);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditSubmit = (data: ItemProps) => {
    replaceItem(data, index);
    setEditMode(false);
  };

  const handleEditCancel = () => {
    setEditMode(false);
  };

  const handleDelete = () => {
    if (item.deleted) {
      resurrectItem(index);
    } else {
      removeItem(index);
    }
  };

  if (editMode) {
    return (
      <TempTaskTableForm
        id={index}
        initialName={item.name}
        initialEstimatedHour={item.estimatedHour}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
      />
    );
  }

  return (
    <tr>
      <td>
        <Text strikethrough={item.deleted}>{index}</Text>
      </td>
      <td>
        <Text strikethrough={item.deleted}>{item.name}</Text>
      </td>
      <td>
        <Text strikethrough={item.deleted}>{item.estimatedHour}</Text>
      </td>
      <td>
        <Flex sx={{ gap: 24 }} justify="flex-end">
          <ActionIcon
            color="indigo"
            variant="outline"
            onClick={handleEdit}
            disabled={item.deleted}
          >
            <MdEdit />
          </ActionIcon>
          <ActionIcon
            variant={item.deleted ? "filled" : "outline"}
            onClick={handleDelete}
          >
            <BsTrashFill />
          </ActionIcon>
        </Flex>
      </td>
    </tr>
  );
};
