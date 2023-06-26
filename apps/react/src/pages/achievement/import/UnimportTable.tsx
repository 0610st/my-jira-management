import { Loader, Table } from "@mantine/core";
import { FC, ReactNode } from "react";
import { SprintsJiraResponse } from "../../../types/sprint";
import { UnimportTableRow } from "./UnimportTableRow";

const TableBase = ({ children }: { children: ReactNode }) => (
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

interface Props {
  data?: SprintsJiraResponse;
  isLoading: boolean;
}

export const UnimportTable: FC<Props> = ({ data, isLoading }) => {
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
        <UnimportTableRow key={value.id} data={value} />
      ))}
    </TableBase>
  );
};
