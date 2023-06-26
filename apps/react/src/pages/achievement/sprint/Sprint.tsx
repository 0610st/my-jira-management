import { Box, Flex } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CountGraph } from "./CountGraph";
import { EstimatedTimeGraph } from "./EstimatedTimeGraph";
import { SprintSelect } from "./SprintSelect";
import { StoryPointResult } from "./StoryPointResult";
import { StoryPointsGraph } from "./StoryPointsGraph";
import { SprintTasks } from "./SprintTasks";
import { MenuTabs } from "../MenuTabs";

export const Sprint = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const sprintId = useMemo(() => (params ? Number(params.id) : null), [params]);

  const [count, setCount] = useState(0);

  const handleChange = useCallback(
    (value: string | null) => {
      navigate(`/achievement/${value ?? ""}`);
    },
    [navigate]
  );

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, [sprintId]);

  return (
    <Flex>
      <Flex direction="column" gap={16}>
        <Box>
          <MenuTabs />
        </Box>
        <Flex justify="flex-start">
          <Box sx={{ width: 300 }}>
            <SprintSelect
              value={sprintId ? `${sprintId}` : ""}
              onChange={handleChange}
            />
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
        <Flex>
          <SprintTasks sprintId={sprintId} />
        </Flex>
      </Flex>
    </Flex>
  );
};
