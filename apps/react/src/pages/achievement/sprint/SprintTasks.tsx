import { useCallback, useEffect, useMemo, useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useTasks } from "../../../../api/hooks";
import { Task } from "../../../../types/task";

interface Props {
  sprintId: number | null;
}

export const SprintTasks: React.FC<Props> = ({ sprintId }) => {
  const { data: tasks, isLoading } = useTasks(
    sprintId === null ? undefined : sprintId,
    sprintId !== null
  );

  const addDiffTimeRow = useCallback((tasks: Task[] | undefined) => {
    if (!tasks) return undefined;
    return tasks.map((task) => ({
      ...task,
      diffTime:
        task.estimatedTime === null || task.spentTime === null
          ? null
          : task.estimatedTime - task.spentTime,
    }));
  }, []);

  const withDiffTasks = useMemo(
    () => addDiffTimeRow(tasks),
    [addDiffTimeRow, tasks]
  );

  const sort = useCallback(
    (
      records:
        | (Task & {
            diffTime: number | null;
          })[]
        | undefined,
      columnAccessor: string,
      direction: "asc" | "desc"
    ) => {
      if (!records) {
        return undefined;
      }

      const sorted = [...records].sort((a, b) => {
        // @ts-ignore
        if (a[columnAccessor] < b[columnAccessor]) {
          return direction === "asc" ? -1 : 1;
        }

        // @ts-ignore
        if (a[columnAccessor] > b[columnAccessor]) {
          return direction === "asc" ? 1 : -1;
        }

        return 0;
      });

      return sorted;
    },
    []
  );

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "key",
    direction: "asc",
  });
  const [records, setRecords] = useState<
    | (Task & {
        diffTime: number | null;
      })[]
    | undefined
  >(sort(withDiffTasks, "key", "asc"));

  useEffect(() => {
    const sortedData = sort(
      withDiffTasks,
      sortStatus.columnAccessor,
      sortStatus.direction
    );
    setRecords(sortedData);
  }, [withDiffTasks, sortStatus, sort]);

  return (
    <DataTable
      withBorder
      withColumnBorders
      minHeight={150}
      fetching={isLoading}
      records={records}
      columns={[
        { accessor: "key", title: "課題ID", sortable: true, width: 100 },
        { accessor: "summary", title: "タイトル" },
        { accessor: "assignee", title: "担当者", sortable: true },
        {
          accessor: "estimatedTime",
          title: "見積h",
          sortable: true,
          textAlignment: "right",
          render: ({ estimatedTime }) =>
            estimatedTime !== null ? estimatedTime / 3600 : null,
        },
        {
          accessor: "spentTime",
          title: "実績h",
          sortable: true,
          textAlignment: "right",
          render: ({ spentTime }) =>
            spentTime !== null ? spentTime / 3600 : null,
        },
        {
          accessor: "diffTime",
          title: "差分h",
          sortable: true,
          textAlignment: "right",
          render: ({ diffTime }) =>
            diffTime !== null ? diffTime / 3600 : null,
          cellsStyle: ({ diffTime }) =>
            diffTime !== null && diffTime < 0 ? { color: "red" } : undefined,
        },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
};
