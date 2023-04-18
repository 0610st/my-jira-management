import { Box, Button, Flex } from "@mantine/core";
import { useState } from "react";
import { SprintContent } from "./SprintContent";

export const Main = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Flex direction="column" sx={{ gap: 18 }}>
      <Box>
        <Button disabled={enabled} onClick={() => setEnabled(true)}>
          データ取得
        </Button>
      </Box>
      <Box>
        <SprintContent enabled={enabled} />
      </Box>
    </Flex>
  );
};
