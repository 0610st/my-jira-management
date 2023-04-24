import { Box, Container, Flex } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSprints } from "../../../../api/hooks";
import { CountGraph } from "./CountGraph";
import { EstimatedTimeGraph } from "./EstimatedTimeGraph";
import { SprintSelect } from "./SprintSelect";
import { StoryPointResult } from "./StoryPointResult";
import { StoryPointsGraph } from "./StoryPointsGraph";

export const Sprint = () => {
  const { data: sprints } = useSprints();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const strSprintId = useMemo(() => {
    if (searchParam.has("sprintId")) {
      return searchParam.get("sprintId");
    }
    if (sprints && sprints.length > 0) {
      return sprints[0].id + "";
    }
    return null;
  }, [searchParam, sprints]);
  const sprintId = Number.isNaN(strSprintId) ? null : Number(strSprintId);

  const [count, setCount] = useState(0);

  const handleChange = useCallback((value: string | null) => {
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
        <Flex justify="flex-start">
          <Box sx={{ width: 300 }}>
            <SprintSelect value={strSprintId} onChange={handleChange} />
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
