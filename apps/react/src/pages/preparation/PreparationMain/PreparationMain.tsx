import { Box, Button, Checkbox, Flex } from "@mantine/core";
import { useState } from "react";
import { useNextSprintFetchOption } from "../../../store/useNextSprintFetchOption";
import { SprintContent } from "./SprintContent";

export const PreparationMain = () => {
  const [enabled, setEnabled] = useState(false);
  const [execute, setExecute] = useState(false);
  const open = useNextSprintFetchOption((state) => state.open);
  const toggleOpen = useNextSprintFetchOption((state) => state.toggleOpen);

  return (
    <Flex direction="column" sx={{ gap: 18 }}>
      <Flex justify="space-between">
        <Flex sx={{ gap: 12 }} align="center">
          <Button disabled={enabled} onClick={() => setEnabled(true)}>
            データ取得
          </Button>
          <Checkbox
            label="未完了のみ"
            checked={open}
            onChange={() => toggleOpen()}
            disabled={enabled}
          />
        </Flex>
        {enabled && (
          <Box>
            <Button disabled={execute} onClick={() => setExecute(true)}>
              反映
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
