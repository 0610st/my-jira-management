import { Box, Button, Container, Flex } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import { useJiraSprints, useSprints } from "../../../../api/hooks";
import { GetJiraSprints } from "../../../../types/sprint";
import { UnimportTable } from "./UnimportTable";

export const Import = () => {
  const { data: currentSprints, isLoading: currentLoading } = useSprints();
  const [enabled, setEnabled] = useState(false);
  const [execute, setExecute] = useState(false);
  const params: GetJiraSprints = useMemo(() => {
    if (!currentSprints || currentSprints.length === 0) {
      return {
        state: "closed",
      };
    }
    return {
      startAt: currentSprints[0].id + "",
      state: "closed",
    };
  }, [currentSprints]);
  const { data, isLoading, refetch } = useJiraSprints(params, enabled);

  const handleSubmit = useCallback(() => {
    if (!enabled) {
      setEnabled(true);
    }
    refetch();
  }, [enabled, refetch, setEnabled]);

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
        data={data}
        isLoading={isLoading && enabled}
        execute={execute}
      />
    </Container>
  );
};