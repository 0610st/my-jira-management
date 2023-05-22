import { Container, Flex, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { MenuTabs } from "./MenuTabs";

export const Preparation = () => (
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
