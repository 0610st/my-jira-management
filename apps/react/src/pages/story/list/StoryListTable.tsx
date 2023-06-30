import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useStories } from "../../../api/hooks";
import { SprintLabel } from "../../../components/label/SprintLabel";
import { CustomDataTable } from "../../../components/table/CustomDataTable";

export const StoryListTable: FC = () => {
  const { data: stories } = useStories(undefined, true);
  const navigate = useNavigate();

  return (
    <CustomDataTable
      records={stories}
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
