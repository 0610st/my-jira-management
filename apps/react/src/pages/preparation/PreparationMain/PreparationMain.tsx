import { Box, Flex } from "@mantine/core";
import { useState } from "react";
import { SearchResult } from "./SearchResult";
import { Header } from "./Header";

export const PreparationMain = () => {
  const [enabled, setEnabled] = useState(false);
  const [execute, setExecute] = useState(false);

  return (
    <Flex direction="column" sx={{ gap: 18 }}>
      <Header
        fetched={enabled}
        onFetchClick={() => setEnabled(true)}
        execute={execute}
        onExecuteClick={() => setExecute(true)}
      />
      <Box>
        <SearchResult enabled={enabled} execute={execute} />
      </Box>
    </Flex>
  );
};
