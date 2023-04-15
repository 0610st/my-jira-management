import { Loader, Table } from "@mantine/core";
import { FC, ReactNode } from "react";
import { SprintsJiraResponse } from "../../../../types/sprint";
import { UnimportTableRow } from "./UnimportTableRow";

const TableBase = ({ children }: { children: ReactNode }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>開始日時</th>
          <th>終了日時</th>
          <th>取込対象</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

interface Props {
  data?: SprintsJiraResponse;
  isLoading: boolean;
  execute: boolean;
}

export const UnimportTable: FC<Props> = ({ data, isLoading, execute }) => {
  if (isLoading) {
    return (
      <TableBase>
        <tr>
          <td colSpan={5}>
            <Loader />
          </td>
        </tr>
      </TableBase>
    );
  }

  return (
    <TableBase>
      {data?.values.map((value) => (
        <UnimportTableRow key={value.id} data={value} execute={execute} />
      ))}
    </TableBase>
  );
};
