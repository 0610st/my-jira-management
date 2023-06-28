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
        { accessor: "id" },
        { accessor: "name" },
        { accessor: "startDate" },
        { accessor: "endDate" },
      ]}
      onRowClick={(row) => navigate(`/sprint/${row.id}`)}
    />
  );
};
