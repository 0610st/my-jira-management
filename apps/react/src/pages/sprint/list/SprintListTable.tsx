import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSprints } from "../../../api/hooks";
import { CustomDataTable } from "../../../components/table/CustomDataTable";

export const SprintListTable: FC = () => {
  const { data: sprints } = useSprints();
  const navigate = useNavigate();

  return (
    <CustomDataTable
      records={sprints}
      columns={[
        { accessor: "id", width: 100, sortable: true },
        { accessor: "name", sortable: true },
        { accessor: "startDate", width: 250, sortable: true },
        { accessor: "endDate", width: 250, sortable: true },
      ]}
      onRowClick={(row) => navigate(`/sprint/${row.id}`)}
    />
  );
};
