import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useStories } from "@/api/hooks";
import { CustomDataTable } from "@/components/CustomDataTable";
import { SprintLabel } from "@/components/SprintLabel";

export const StoryListTable: FC = () => {
  const { data: stories } = useStories(undefined, true);
  const navigate = useNavigate();

  return (
    <CustomDataTable
      records={stories?.body}
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
        { accessor: "storyPoint", width: 200, sortable: true },
      ]}
      onRowClick={({ key }) => navigate(`/story/${key}`)}
    />
  );
};
