import { Box } from "@mantine/core";
import { FC } from "react";
import { MenuTabs } from "../MenuTabs";
import { StoryListTable } from "./StoryListTable";

export const StoryList: FC = () => (
  <>
    <Box>
      <MenuTabs />
    </Box>
    <Box>
      <StoryListTable />
    </Box>
  </>
);
