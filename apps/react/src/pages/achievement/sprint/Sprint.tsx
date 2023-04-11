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
  const strSprintId = searchParam.get("sprintId");
  const sprintId = Number.isNaN(strSprintId) ? null : Number(strSprintId);
  useSprintSummary(Number(sprintId), sprintId !== null);

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
            <SprintSelect value={strSprintId} onChange={handleChanget} />
          </Box>
        </Flex>
        <Flex>
          <SprintSummary sprintId={sprintId} />
        </Flex>
        <Flex>
          <MemberGraphs sprintId={sprintId} />
        </Flex>
      </Flex>
    </Container>
  );
};
