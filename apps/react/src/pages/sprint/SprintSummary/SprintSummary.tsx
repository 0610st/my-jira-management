import { Box, Flex } from "@mantine/core";
import { FC, useState } from "react";
import { SprintSummaryMenu } from "./SprintSummaryMenu";
import { SprintSummaryGraph } from "./SprintSummaryGraph";
import { SprintSummaryTable } from "./SprintSummaryTable";

export const SprintSummary: FC = () => {
  const [menu, setMenu] = useState("graph");
  return (
    <Flex direction="column">
      <Box>
        <SprintSummaryMenu menu={menu} onChange={setMenu} />
      </Box>
      {menu === "table" ? <SprintSummaryTable /> : <SprintSummaryGraph />}
    </Flex>
  );
};
