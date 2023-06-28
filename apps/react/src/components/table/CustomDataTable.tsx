import { Flex, Select } from "@mantine/core";
import { DataTable, DataTableProps } from "mantine-datatable";
import { useEffect, useState } from "react";

export const CustomDataTable = <T,>(props: DataTableProps<T>) => {
  const { records, columns, onRowClick } = props;
  const [showRecords, setShowRecords] = useState<T[]>();
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (records) {
      const newPage =
        (page - 1) * pageSize > records.length
          ? Math.ceil(records.length / pageSize)
          : page;
      setPage(newPage);
      setShowRecords(
        records.slice((newPage - 1) * pageSize, newPage * pageSize)
      );
    }
  }, [page, records, pageSize]);

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
        records={showRecords}
        columns={columns}
        totalRecords={records ? records.length : 0}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={(p) => setPage(p)}
        onRowClick={onRowClick}
      />
    </Flex>
  );
};
