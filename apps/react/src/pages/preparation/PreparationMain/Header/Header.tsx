import { Box, Button, Checkbox, Flex } from "@mantine/core";
import { FC } from "react";
import { useNextSprintFetchOption } from "@/store/useNextSprintFetchOption";

interface HeaderProps {
  fetched: boolean;
  onFetchClick: () => void;
  execute: boolean;
  onExecuteClick: () => void;
}

export const Header: FC<HeaderProps> = ({
  fetched,
  onFetchClick,
  execute,
  onExecuteClick,
}) => {
  const open = useNextSprintFetchOption((state) => state.open);
  const toggleOpen = useNextSprintFetchOption((state) => state.toggleOpen);

  return (
    <Flex justify="space-between">
      <Flex sx={{ gap: 12 }} align="center">
        <Button disabled={fetched} onClick={onFetchClick}>
          データ取得
        </Button>
        <Checkbox
          label="未完了のみ"
          checked={open}
          onChange={() => toggleOpen()}
          disabled={fetched}
        />
      </Flex>
      {fetched && (
        <Box>
          <Button disabled={execute} onClick={onExecuteClick}>
            反映
          </Button>
        </Box>
      )}
    </Flex>
  );
};
