import { Box, Container, Flex } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface StoryProps {
  dummy?: unknown;
}

export const Story: FC<StoryProps> = () => {
  return (
    <Container fluid display="flex">
      <Flex direction="column" sx={{ flex: 1 }} gap={16}>
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Flex>
    </Container>
  );
};
