import { Container } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { MenuTabs } from "./MenuTabs";

export const Achievement: FC = () => {
  return (
    <Container>
      <MenuTabs />
      <Outlet />
    </Container>
  );
};
