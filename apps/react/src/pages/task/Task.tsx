import { Box, Container, Flex } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { MenuTabs } from "./MenuTabs";

export const Task: FC = () => (
  <Container fluid display="flex">
    <Flex direction="column" sx={{ flex: 1 }} gap={16}>
      <Box>
        <MenuTabs />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Flex>
  </Container>
);
