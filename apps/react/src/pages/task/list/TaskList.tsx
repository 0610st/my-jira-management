import { Box } from "@mantine/core";
import { FC } from "react";
import { MenuTabs } from "../MenuTabs";
import { TaskListTable } from "./TaskListTable";

export const TaskList: FC = () => (
  <>
    <Box>
      <MenuTabs />
    </Box>
    <Box>
      <TaskListTable />
    </Box>
  </>
);
