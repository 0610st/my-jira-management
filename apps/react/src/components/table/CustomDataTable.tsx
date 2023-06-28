import { Flex, Select } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useEffect, useState } from "react";

interface DataTableProps<T> {
  data: T[] | undefined;
  columns: DataTableColumn<T>[];
  onRowClick?: (row: T) => void;
}

export const CustomDataTable = <T,>(props: DataTableProps<T>) => {
  const { data, columns, onRowClick } = props;
  const [records, setRecords] = useState<T[]>();
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data) {
      const newPage =
        (page - 1) * pageSize > data.length
          ? Math.ceil(data.length / pageSize)
          : page;
      setPage(newPage);
      setRecords(data.slice((newPage - 1) * pageSize, newPage * pageSize));
    }
  }, [page, data, pageSize]);

  return (
    <Flex direction="column" sx={{ gap: 6 }}>
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
        records={records}
        columns={columns}
        totalRecords={data ? data.length : 0}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        onRowClick={onRowClick}
      />
    </Flex>
  );
};
