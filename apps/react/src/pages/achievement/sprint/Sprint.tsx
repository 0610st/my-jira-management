import { Box, Container, Flex } from "@mantine/core";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSprintSummary, useTaskSummaries } from "../../../../api/hooks";
import { MemberGraphs } from "./MemberGraphs";
import { SprintSelect } from "./SprintSelect";
import { SprintSummary } from "./SprintSummary";

export const Sprint = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const sprintId = searchParam.get("sprintId");
  useSprintSummary(Number(sprintId), !isNaN(Number(sprintId)));

  const handleChanget = useCallback((value: string | null) => {
    if (value === null) {
      navigate({ search: "" });
    } else {
      navigate({ search: `sprintId=${value}` });
    }
  }, []);

  return (
    <Container>
      <Flex direction="column" gap={16}>
        <Flex justify="flex-end">
          <Box sx={{ width: 300 }}>
            <SprintSelect value={sprintId} onChange={handleChanget} />
          </Box>
        </Flex>
        <Flex>
          <SprintSummary />
        </Flex>
        <Flex>
          <MemberGraphs sprintId={sprintId} />
        </Flex>
      </Flex>
    </Container>
  );
};
