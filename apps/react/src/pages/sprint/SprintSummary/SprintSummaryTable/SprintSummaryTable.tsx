import { FC, useMemo, useState } from "react";
import { MultiSelect } from "@mantine/core";
import { useSprints, useStorySummaries, useTaskSummaries } from "@/api/hooks";
import { CustomDataTable } from "@/components/CustomDataTable";
import { UNASSIGNED } from "../../SprintDetail/consts";
import { secondToHour } from "@/utils/util";

export const SprintSummaryTable: FC = () => {
  const { data: sprints } = useSprints();
  const { data: taskSummaries } = useTaskSummaries();
  const { data: storySummaries } = useStorySummaries();

  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const assignees = useMemo(() => {
    if (!taskSummaries) {
      return [];
    }
    return [
      ...new Set(taskSummaries.body.map((task) => task.assignee ?? UNASSIGNED)),
    ];
  }, [taskSummaries]);

  const data = useMemo(() => {
    if (!sprints || !taskSummaries || !storySummaries) return [];
    return taskSummaries.body
      .filter((taskSummary) => {
        if (selectedAssignees.length === 0) return true;
        if (taskSummary.assignee === null) {
          return selectedAssignees.includes(UNASSIGNED);
        }
        return selectedAssignees.includes(taskSummary.assignee);
      })
      .map((taskSummary) => ({
        sprint: sprints.body.find(
          (sprint) => sprint.id === taskSummary.sprintId,
        )?.name,
        point: storySummaries.body.find(
          (storySummary) => storySummary.sprintId === taskSummary.sprintId,
        )?.sum.storyPoint,
        assignee: taskSummary.assignee,
        estimatedTime:
          taskSummary.sum.estimatedTime !== null
            ? secondToHour(taskSummary.sum.estimatedTime)
            : null,
        spentTime:
          taskSummary.sum.spentTime !== null
            ? secondToHour(taskSummary.sum.spentTime ?? 0)
            : null,
        diffTime:
          taskSummary.sum.estimatedTime !== null &&
          taskSummary.sum.spentTime !== null
            ? secondToHour(
                (taskSummary.sum.estimatedTime ?? 0) -
                  (taskSummary.sum.spentTime ?? 0),
              )
            : null,
      }));
  }, [selectedAssignees, sprints, storySummaries, taskSummaries]);

  return (
    <CustomDataTable
      records={data}
      columns={[
        { accessor: "sprint", width: 120, sortable: true },
        {
          accessor: "point",
          title: "ストーリーポイント",
          width: 100,
          sortable: true,
        },
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
            diffTime < 0 ? { color: "red" } : undefined,
          width: 100,
        },
      ]}
      initialSortStatus={{ columnAccessor: "sprint", direction: "desc" }}
    />
  );
};
