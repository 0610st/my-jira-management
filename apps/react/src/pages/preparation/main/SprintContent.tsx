import { Box, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { useJiraFutureSprints } from "../../../api/hooks";
import { SprintContentSummary } from "./SprintContentSummary";
import { SprintEpicSelectContainer } from "./SprintEpicSelectContainer";
import { SprintIssues } from "./SprintIssues";

interface Props {
  enabled: boolean;
  execute: boolean;
}

export const SprintContent: FC<Props> = ({ enabled, execute }) => {
  const {
    data: futureSprint,
    isLoading,
    error,
  } = useJiraFutureSprints(enabled);

  if (isLoading) {
    return <div />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (futureSprint.values.length !== 1) {
    return (
      <div>
        {`このデータは取り込めません。${JSON.stringify(futureSprint.values)}`}
      </div>
    );
  }

  return (
    <Flex sx={{ gap: 16 }} wrap="wrap">
      <Box w={300}>
        <Text fz="lg">{futureSprint.values[0].name}</Text>
        <Box mt={8}>
          <SprintContentSummary />
        </Box>
        <Box mt={8}>
          <SprintEpicSelectContainer sprintId={futureSprint.values[0].id} />
        </Box>
      </Box>
      <Box sx={{ flex: 1 }} miw={700}>
        <SprintIssues sprintId={futureSprint.values[0].id} execute={execute} />
      </Box>
    </Flex>
  );
};
