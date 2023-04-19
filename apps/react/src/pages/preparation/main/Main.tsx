import { Box, Button, Flex } from "@mantine/core";
import { useState } from "react";
import { SprintContent } from "./SprintContent";

export const Main = () => {
  const [enabled, setEnabled] = useState(false);
  const [execute, setExecute] = useState(false);

  return (
    <Flex direction="column" sx={{ gap: 18 }}>
      <Flex justify="space-between">
        <Button disabled={enabled} onClick={() => setEnabled(true)}>
          データ取得
        </Button>
        {enabled && (
          <Box>
            <Button disabled={execute} onClick={() => setExecute(true)}>
              取込実行
            </Button>
          </Box>
        )}
      </Flex>
      <Box>
        <SprintContent enabled={enabled} execute={execute} />
      </Box>
    </Flex>
  );
};
