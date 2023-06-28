import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../../api/hooks";
import { SprintLabel } from "../../../components/label/SprintLabel";
import { CustomDataTable } from "../../../components/table/CustomDataTable";

export const TaskListTable: FC = () => {
  const { data: tasks } = useTasks(undefined, true);
  const navigate = useNavigate();

  return (
    <CustomDataTable
      records={tasks}
      columns={[
        { accessor: "key", width: 120 },
        {
          accessor: "sprintId",
          title: "Sprint",
          render: ({ sprintId }) =>
            sprintId ? <SprintLabel sprintId={sprintId} /> : <></>,
          width: 120,
        },
        { accessor: "summary" },
        { accessor: "assignee", width: 200 },
        { accessor: "estimatedTime", width: 200 },
        { accessor: "spentTime", width: 200 },
      ]}
      onRowClick={({ key }) => navigate(`/task/${key}`)}
    />
  );
};
