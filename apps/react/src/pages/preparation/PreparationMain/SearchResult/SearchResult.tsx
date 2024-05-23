import { Box, Flex } from "@mantine/core";
import { FC } from "react";
import { useJiraFutureSprints } from "../../../../api/hooks";
import { SprintIssues } from "./SprintIssues";
import { Sidebar } from "./Sidebar";

interface Props {
  enabled: boolean;
  execute: boolean;
}

export const SearchResult: FC<Props> = ({ enabled, execute }) => {
  const {
    data: futureSprint,
    isLoading,
    error,
  } = useJiraFutureSprints(enabled);

  if (isLoading) {
    return <div />;
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return <div>error raise</div>;
  }

  if (futureSprint.body.values.length !== 1) {
    return (
      <div>{`このデータは取り込めません。${JSON.stringify(futureSprint)}`}</div>
    );
  }

  return (
    <Flex sx={{ gap: 16 }} wrap="wrap">
      <Sidebar
        sprintId={futureSprint.body.values[0].id}
        sprintName={futureSprint.body.values[0].name}
      />
      <Box sx={{ flex: 1 }} miw={700}>
        <SprintIssues
          sprintId={futureSprint.body.values[0].id}
          execute={execute}
        />
      </Box>
    </Flex>
  );
};
