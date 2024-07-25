import { Container, Flex, Box } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Menu, MenuTabs } from "./MenuTabs";

export interface MainLayoutProps {
  menus?: Menu[];
}

export const MainLayout: FC<MainLayoutProps> = ({ menus }) => {
  return (
    <Container fluid display="flex">
      <Flex direction="column" sx={{ flex: 1 }} gap={16}>
        {menus && (
          <Box>
            <MenuTabs menus={menus} />
          </Box>
        )}
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Flex>
    </Container>
  );
};
