import { ActionIcon, Flex, Table, Text } from "@mantine/core";
import { ItemProps, useTempTaskItems } from "../../../store/useTempTaskItems";
import { TempTaskTableItem } from "./TempTaskTableItem";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { TempTaskTableForm } from "./TempTaskTableForm";

export const TempTaskTable = () => {
  const taskItems = useTempTaskItems((state) => state.items);
  const addItem = useTempTaskItems((state) => state.addItem);
  const [showAddRow, setShowAddRow] = useState(false);
  const [count, setCount] = useState(0);

  const handleAddSubmit = (data: ItemProps) => {
    addItem(data);
    setCount((count) => count + 1);
    setShowAddRow(false);
  };

  const handleAddCancel = () => {
    setCount((count) => count + 1);
    setShowAddRow(false);
  };

  return (
    <>
      <Flex justify="space-between">
        <Text fz="sm">基本タスク</Text>
        <ActionIcon variant="outline" onClick={() => setShowAddRow(true)}>
          <IoMdAdd />
        </ActionIcon>
      </Flex>
      <Table>
        <thead>
          <tr>
            <th style={{ width: 50 }}>ID</th>
            <th style={{ width: 500 }}>タスク名</th>
            <th>見積h</th>
            <th style={{ width: 200 }}></th>
          </tr>
        </thead>
        <tbody>
          {taskItems.map((item, index) => (
            <TempTaskTableItem key={index} index={index} item={item} />
          ))}
          {showAddRow && (
            <TempTaskTableForm
              key={count}
              onSubmit={handleAddSubmit}
              onCancel={handleAddCancel}
            />
          )}
        </tbody>
      </Table>
    </>
  );
};
