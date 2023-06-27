import { Box } from "@mantine/core";
import { FC } from "react";
import { MenuTabs } from "../MenuTabs";
import { SprintListTable } from "./SprintListTable";

export const SprintList: FC = () => (
  <>
    <Box>
      <MenuTabs />
    </Box>
    <Box mt={18}>
      <SprintListTable />
    </Box>
  </>
);
