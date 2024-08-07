import { AppShell } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const BaseLayout: FC = () => (
  <AppShell
    padding="md"
    navbar={<Navbar />}
    styles={(theme) => ({
      main: {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      },
    })}
  >
    <Outlet />
  </AppShell>
);
