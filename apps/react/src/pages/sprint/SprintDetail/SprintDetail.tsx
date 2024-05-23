import { Box, Flex } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EstimatedTimeGraph } from "./EstimatedTimeGraph";
import { SprintSelect } from "./SprintSelect";
import { StoryPointResult } from "./StoryPointResult";
import { StoryPointsGraph } from "./StoryPointsGraph";
import { SprintTasks } from "./SprintTasks";
import { MenuTabs } from "../MenuTabs";

export const SprintDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const sprintId = useMemo(() => (params ? Number(params.id) : null), [params]);

  const [count, setCount] = useState(0);

  const handleChange = useCallback(
    (value: string | null) => {
      navigate(`/sprint/${value ?? ""}`);
    },
    [navigate],
  );

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, [sprintId]);

  return (
    <Flex>
      <Flex direction="column" gap={8}>
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
        <Flex display="row" justify="flex-start" wrap="wrap" gap={32}>
          <Flex direction="column" align="center">
            <Box>
              <StoryPointResult sprintId={sprintId} />
            </Box>
            <StoryPointsGraph
              key={count}
              sprintId={sprintId}
              width={600}
              height={250}
            />
          </Flex>
          <EstimatedTimeGraph sprintId={sprintId} width={300} height={300} />
        </Flex>
        <Flex>
          <SprintTasks sprintId={sprintId} />
        </Flex>
      </Flex>
    </Flex>
  );
};
