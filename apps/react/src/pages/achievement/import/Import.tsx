import { Box, Button, Container, Flex } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import { useJiraSprints, useSprints } from "../../../../api/hooks";
import { GetJiraSprints } from "../../../../types/sprint";
import { UnimportTable } from "./UnimportTable";

export const Import = () => {
  const {
    data: currentSprints,
    isLoading: currentLoading,
    refetch,
  } = useSprints();
  const [enabled, setEnabled] = useState(false);
  const [execute, setExecute] = useState(false);
  const [key, setKey] = useState(0);
  const params: GetJiraSprints = useMemo(() => {
    if (!currentSprints || currentSprints.length === 0) {
      return {
        state: "closed",
      };
    }
    return {
      startAt: currentSprints.length,
      state: "closed",
    };
  }, [currentSprints]);
  const { data, isLoading } = useJiraSprints(params, enabled);

  const handleSubmit = useCallback(() => {
    if (!enabled) {
      setEnabled(true);
      return;
    }
    setKey((prev) => prev + 1);
    setExecute(false);
    refetch();
  }, [enabled, refetch, setEnabled, setKey]);

  return (
    <Container fluid>
      <Flex justify="space-between">
        <Box>
          <Button onClick={handleSubmit} disabled={currentLoading}>
            未取込スプリント取得
          </Button>
        </Box>
        {enabled && (
          <Box>
            <Button onClick={() => setExecute(true)}>取込実行</Button>
          </Box>
        )}
      </Flex>
      <UnimportTable
        key={key}
        data={data}
        isLoading={isLoading && enabled}
        execute={execute}
      />
    </Container>
  );
};
