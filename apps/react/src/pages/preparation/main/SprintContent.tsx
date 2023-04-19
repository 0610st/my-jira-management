import { Box, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { useJiraFutureSprints } from "../../../../api/hooks";
import { SprintContentSub } from "./SprintContentSub";
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

  console.log(futureSprint);

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  if (futureSprint.values.length !== 1) {
    return (
      <>{`このデータは取り込めません。${JSON.stringify(
        futureSprint.values
      )}`}</>
    );
  }

  return (
    <Flex sx={{ gap: 16 }} wrap="wrap">
      <Box w={300}>
        <Text fz="lg">{futureSprint.values[0].name}</Text>
        <Box mt={8}>
          <SprintContentSub />
        </Box>
      </Box>
      <Box sx={{ flex: 1 }} miw={700}>
        <SprintIssues sprintId={futureSprint.values[0].id} execute={execute} />
      </Box>
    </Flex>
  );
};
