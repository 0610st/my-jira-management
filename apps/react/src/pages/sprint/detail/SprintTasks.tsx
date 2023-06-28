import { useCallback, useMemo, useState } from "react";
import { MultiSelect } from "@mantine/core";
import { useTasks } from "../../../api/hooks";
import { Task } from "../../../types/task";
import { IssueLink } from "../../../components/link/IssueLink";
import { UNASSIGNED } from "./consts";
import { CustomDataTable } from "../../../components/table/CustomDataTable";

interface Props {
  sprintId: number | null;
}

export const SprintTasks: React.FC<Props> = ({ sprintId }) => {
  const { data: taskData, isLoading } = useTasks(
    sprintId === null ? undefined : sprintId,
    sprintId !== null
  );
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const assignees = useMemo(() => {
    if (!taskData) {
      return [];
    }
    return [...new Set(taskData.map((task) => task.assignee ?? UNASSIGNED))];
  }, [taskData]);

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

  const records = useMemo(() => {
    const data = taskData?.map((task) => ({
      ...task,
      diffTime:
        task.estimatedTime !== null && task.spentTime !== null
          ? task.estimatedTime - task.spentTime
          : null,
    }));
    return filter(data);
  }, [filter, taskData]);

  return (
    <CustomDataTable
      shadow="sm"
      verticalAlignment="top"
      minHeight={150}
      fetching={isLoading}
      records={records}
      columns={[
        {
          accessor: "key",
          title: "課題ID",
          sortable: true,
          width: 150,
          render: ({ key }) => (
            <IssueLink issueId={key} color="dimmed">
              {key}
            </IssueLink>
          ),
        },
        { accessor: "summary", title: "タイトル" },
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
          render: ({ estimatedTime }) =>
            estimatedTime !== null
              ? Math.round((estimatedTime / 3600) * 100) / 100
              : null,
        },
        {
          accessor: "spentTime",
          title: "実績h",
          sortable: true,
          textAlignment: "right",
          width: 100,
          render: ({ spentTime }) =>
            spentTime !== null
              ? Math.round((spentTime / 3600) * 100) / 100
              : null,
        },
        {
          accessor: "diffTime",
          title: "差分h",
          sortable: true,
          textAlignment: "right",
          cellsStyle: ({ diffTime }) =>
            diffTime !== null && diffTime < 0 ? { color: "red" } : undefined,
          width: 100,
          render: ({ diffTime }) =>
            diffTime !== null
              ? Math.round((diffTime / 3600) * 100) / 100
              : null,
        },
      ]}
    />
  );
};
