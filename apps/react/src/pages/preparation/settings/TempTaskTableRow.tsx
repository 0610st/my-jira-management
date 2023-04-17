import { Flex, ActionIcon, Button } from "@mantine/core";
import { FC, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { ItemProps, useTempTaskItems } from "../../../store/useTempTaskItems";
import { TempTaskTableForm } from "./TempTaskTableForm";

interface Props {
  index: number;
  item: ItemProps;
}
export const TempTaskTableRow: FC<Props> = ({ index, item }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const replaceItem = useTempTaskItems((state) => state.replaceItem);
  const removeItem = useTempTaskItems((state) => state.removeItem);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteConfirm(true);
  };

  const handleEditSubmit = (data: ItemProps) => {
    replaceItem(data, index);
    setEditMode(false);
  };

  const handleEditCancel = () => {
    setEditMode(false);
  };

  const handleDeleteSubmit = () => {
    removeItem(index);
    setDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(false);
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
      <td>{index}</td>
      <td>{item.name}</td>
      <td>{item.estimatedHour}</td>
      <td>
        <Flex sx={{ gap: 24 }} justify="flex-end">
          {deleteConfirm ? (
            <>
              <Button variant="filled" onClick={handleDeleteSubmit}>
                削除する
              </Button>
              <Button variant="default" onClick={handleDeleteCancel}>
                削除しない
              </Button>
            </>
          ) : (
            <>
              <ActionIcon color="indigo" variant="outline" onClick={handleEdit}>
                <MdEdit />
              </ActionIcon>
              <ActionIcon variant="outline" onClick={handleDeleteConfirm}>
                <BsTrashFill />
              </ActionIcon>
            </>
          )}
        </Flex>
      </td>
    </tr>
  );
};
