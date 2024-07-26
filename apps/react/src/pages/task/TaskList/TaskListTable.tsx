import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "@/api/hooks";
import { CustomDataTable } from "@/components/CustomDataTable";
import { SprintLabel } from "@/components/SprintLabel";
import { secondToHour } from "@/utils/util";

export const TaskListTable: FC = () => {
  const { data: tasks } = useTasks(undefined, true);
  const navigate = useNavigate();

  const records = useMemo(
    () =>
      tasks?.body.map((task) => ({
        ...task,
        diffTime:
          task.estimatedTime !== null && task.spentTime !== null
            ? task.estimatedTime - task.spentTime
            : null,
      })),
    [tasks],
  );

  return (
    <CustomDataTable
      records={records}
      columns={[
        { accessor: "key", width: 120, sortable: true },
        {
          accessor: "sprintId",
          title: "Sprint",
          render: ({ sprintId }) =>
            sprintId ? <SprintLabel sprintId={sprintId} /> : <></>,
          width: 120,
          sortable: true,
        },
        { accessor: "summary" },
        { accessor: "assignee", width: 200, sortable: true },
        {
          accessor: "estimatedTime",
          width: 150,
          textAlignment: "right",
          sortable: true,
          render: ({ estimatedTime }) =>
            estimatedTime !== null ? secondToHour(estimatedTime) : null,
        },
        {
          accessor: "spentTime",
          width: 150,
          textAlignment: "right",
          sortable: true,
          render: ({ spentTime }) =>
            spentTime !== null ? secondToHour(spentTime) : null,
        },
        {
          accessor: "diffTime",
          width: 150,
          textAlignment: "right",
          cellsStyle: ({ diffTime }) =>
            diffTime !== null && diffTime < 0 ? { color: "red" } : undefined,
          sortable: true,
          render: ({ diffTime }) =>
            diffTime !== null ? secondToHour(diffTime) : null,
        },
      ]}
      onRowClick={({ key }) => navigate(`/task/${key}`)}
    />
  );
};
