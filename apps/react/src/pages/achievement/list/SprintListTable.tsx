import { FC, useState } from "react";
import { DataTable } from "mantine-datatable";
import { useNavigate } from "react-router-dom";
import { useSprints } from "../../../api/hooks";

export const SprintListTable: FC = () => {
  const { data: sprints } = useSprints();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  return (
    <DataTable
      records={sprints}
      columns={[
        { accessor: "id" },
        { accessor: "name" },
        { accessor: "startDate" },
        { accessor: "endDate" },
      ]}
      totalRecords={sprints ? sprints.length : 0}
      recordsPerPage={50}
      page={page}
      onPageChange={(p) => setPage(p)}
      onRowClick={(row) => navigate(`/achievement/${row.id}`)}
    />
  );
};
