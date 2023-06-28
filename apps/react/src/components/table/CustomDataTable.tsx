import { Flex, Select } from "@mantine/core";
import {
  DataTable,
  DataTableProps,
  DataTableSortStatus,
} from "mantine-datatable";
import { useCallback, useEffect, useMemo, useState } from "react";

export const CustomDataTable = <T,>(props: DataTableProps<T>) => {
  const { records, columns, onRowClick } = props;
  const [showRecords, setShowRecords] = useState<T[]>();
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "",
    direction: "asc",
  });

  const sortBy = useCallback(
    (
      data: T[] | undefined,
      columnAccessor: string,
      direction: "asc" | "desc"
    ) => {
      if (!data) {
        return undefined;
      }

      const sorted = Array.from(data).sort((a, b) => {
        const valueA = a[columnAccessor as keyof T];
        const valueB = b[columnAccessor as keyof T];

        if (valueA == null) {
          return 1;
        }

        if (valueB == null) {
          return -1;
        }

        if (valueA < valueB) {
          return direction === "asc" ? -1 : 1;
        }

        if (valueA > valueB) {
          return direction === "asc" ? 1 : -1;
        }

        return 0;
      });

      return sorted;
    },
    []
  );

  const sortedRecords = useMemo(
    () => sortBy(records, sortStatus.columnAccessor, sortStatus.direction),
    [records, sortBy, sortStatus.columnAccessor, sortStatus.direction]
  );

  useEffect(() => {
    if (sortedRecords) {
      const newPage =
        (page - 1) * pageSize > sortedRecords.length
          ? Math.ceil(sortedRecords.length / pageSize)
          : page;
      setPage(newPage);
      setShowRecords(
        sortedRecords.slice((newPage - 1) * pageSize, newPage * pageSize)
      );
    }
  }, [page, pageSize, sortedRecords]);

  return (
    <Flex direction="column" sx={{ flex: 1, gap: 6 }}>
      <Flex justify="flex-end">
        <Select
          label="行数"
          value={`${pageSize}`}
          onChange={(value) => setPageSize(Number(value))}
          data={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "30", label: "30" },
            { value: "50", label: "50" },
            { value: "100", label: "100" },
          ]}
        />
      </Flex>
      <DataTable
        records={showRecords}
        columns={columns}
        totalRecords={records ? records.length : 0}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        onRowClick={onRowClick}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
      />
    </Flex>
  );
};
