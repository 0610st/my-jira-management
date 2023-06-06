import { useCallback, useMemo, useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { MultiSelect } from "@mantine/core";
import { useTasks } from "../../../../api/hooks";
import { Task } from "../../../../types/task";

const UNASSIGNED = "(未割り当て)";

interface Props {
  sprintId: number | null;
}

export const SprintTasks: React.FC<Props> = ({ sprintId }) => {
  const { data: taskData, isLoading } = useTasks(
    sprintId === null ? undefined : sprintId,
    sprintId !== null
  );
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "",
    direction: "asc",
  });
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const assignees = useMemo(() => {
    if (!taskData) {
      return [];
    }
    return [...new Set(taskData.map((task) => task.assignee ?? UNASSIGNED))];
  }, [taskData]);

  const sortBy = useCallback(
    (
      records: (Task & { diffTime: number | null })[] | undefined,
      columnAccessor: string,
      direction: "asc" | "desc"
    ) => {
      if (!records) {
        return undefined;
      }

      const sorted = [...records].sort((a, b) => {
        if (!(columnAccessor in a) || !(columnAccessor in b)) {
          return -1;
        }

        // @ts-expect-error columnAccessor is key of Task
        if (a[columnAccessor] === null) {
          return 1;
        }

        // @ts-expect-error columnAccessor is key of Task
        if (b[columnAccessor] === null) {
          return -1;
        }

        // @ts-expect-error columnAccessor is key of Task
        if (a[columnAccessor] < b[columnAccessor]) {
          return direction === "asc" ? -1 : 1;
        }

        // @ts-expect-error columnAccessor is key of Task
        if (a[columnAccessor] > b[columnAccessor]) {
          return direction === "asc" ? 1 : -1;
        }

        return 0;
      });

      return sorted;
    },
    []
  );

  const filter = useCallback(
    (records: (Task & { diffTime: number | null })[] | undefined) => {
      if (!records) {
        return undefined;
      }
      if (selectedAssignees.length === 0) {
        return records;
      }
      return records.filter((record) => {
        if (record.assignee === null) {
          return selectedAssignees.includes(UNASSIGNED);
        }
        return selectedAssignees.includes(record.assignee);
      });
    },
    [selectedAssignees]
  );

  const calcDiffTime = useCallback(
    (estimatedTime: number | null, spentTime: number | null) => {
      if (estimatedTime === null || spentTime === null) {
        return null;
      }
      return Math.round(((estimatedTime - spentTime) / 3600) * 100) / 100;
    },
    []
  );

  const records = useMemo(() => {
    if (!taskData) {
      return [];
    }
    const data = taskData.map((task) => ({
      ...task,
      diffTime: calcDiffTime(task.estimatedTime, task.spentTime),
      estimatedTime:
        task.estimatedTime !== null
          ? Math.round((task.estimatedTime / 3600) * 100) / 100
          : null,
      spentTime:
        task.spentTime !== null
          ? Math.round((task.spentTime / 3600) * 100) / 100
          : null,
    }));
    return filter(
      sortBy(data, sortStatus.columnAccessor, sortStatus.direction)
    );
  }, [
    calcDiffTime,
    filter,
    sortBy,
    sortStatus.columnAccessor,
    sortStatus.direction,
    taskData,
  ]);

  return (
    <DataTable
      sx={{ width: "100%" }}
      shadow="sm"
      verticalAlignment="top"
      minHeight={150}
      fetching={isLoading}
      records={records}
      columns={[
        { accessor: "key", title: "課題ID", sortable: true, width: 150 },
        { accessor: "summary", title: "タイトル", width: "auto" },
        {
          accessor: "assignee",
          title: "担当者",
          sortable: true,
          width: 200,
          filter: (
            <MultiSelect
              w={300}
              label="担当者選択"
              data={assignees}
              value={selectedAssignees}
              onChange={setSelectedAssignees}
              clearable
              searchable
            />
          ),
          filtering: selectedAssignees.length > 0,
        },
        {
          accessor: "estimatedTime",
          title: "見積h",
          sortable: true,
          textAlignment: "right",
          width: 100,
        },
        {
          accessor: "spentTime",
          title: "実績h",
          sortable: true,
          textAlignment: "right",
          width: 100,
        },
        {
          accessor: "diffTime",
          title: "差分h",
          sortable: true,
          textAlignment: "right",
          cellsStyle: ({ diffTime }) =>
            diffTime !== null && diffTime < 0 ? { color: "red" } : undefined,
          width: 100,
        },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
};
