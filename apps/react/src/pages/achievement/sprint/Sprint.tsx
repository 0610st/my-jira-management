import { Box, Container, Flex } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CountGraph } from "./CountGraph";
import { EstimatedTimeGraph } from "./EstimatedTimeGraph";
import { SprintSelect } from "./SprintSelect";
import { StoryPointResult } from "./StoryPointResult";
import { StoryPointsGraph } from "./StoryPointsGraph";

export const Sprint = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const strSprintId = searchParam.get("sprintId");
  const sprintId = Number.isNaN(strSprintId) ? null : Number(strSprintId);
  const [count, setCount] = useState(0);

  const handleChanget = useCallback((value: string | null) => {
    if (value === null) {
      navigate({ search: "" });
    } else {
      navigate({ search: `sprintId=${value}` });
    }
  }, []);

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, [sprintId]);

  return (
    <Container fluid>
      <Flex direction="column" gap={16}>
        <Flex justify="flex-end">
          <Box sx={{ width: 300 }}>
            <SprintSelect value={strSprintId} onChange={handleChanget} />
          </Box>
        </Flex>
        <Flex display="row" justify="flex-start" wrap="wrap" gap={16}>
          <Flex display="row" justify="flex-start" wrap="wrap" gap={16}>
            <StoryPointResult sprintId={sprintId} width={400} height={300} />
            <StoryPointsGraph
              key={count}
              sprintId={sprintId}
              width={400}
              height={300}
            />
          </Flex>
          <Flex display="row" justify="flex-start" wrap="wrap" gap={16}>
            <EstimatedTimeGraph sprintId={sprintId} width={400} height={300} />
            <CountGraph sprintId={sprintId} width={400} height={300} />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
