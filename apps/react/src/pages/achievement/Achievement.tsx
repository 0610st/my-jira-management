import { Container } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useStorySummaries } from "../../../api/hooks";
import { MenuTabs } from "./MenuTabs";

export const Achievement: FC = () => {
  useStorySummaries();
  return (
    <Container>
      <MenuTabs />
      <Outlet />
    </Container>
  );
};
