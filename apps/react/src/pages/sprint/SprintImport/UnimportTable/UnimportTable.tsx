import { Loader, Table } from "@mantine/core";
import { FC } from "react";
import { SprintsJiraResponse } from "../../../../types/sprint";
import { UnimportTableRow } from "./UnimportTableRow";
import { UnimportTableHead } from "./UnimportTableHead";

interface Props {
  data?: SprintsJiraResponse;
  isLoading: boolean;
}

export const UnimportTable: FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Table>
        <UnimportTableHead />
        <tbody>
          <tr>
            <td colSpan={5}>
              <Loader />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  return (
    <Table>
      <UnimportTableHead />
      <tbody>
        {data?.values.map((value) => (
          <UnimportTableRow key={value.id} data={value} />
        ))}
      </tbody>
    </Table>
  );
};
