import { Box, Button, Flex } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useJiraSprints, useSprints } from "../../../api/hooks";
import { GetJiraSprints } from "../../../types/sprint";
import { useSprintImportPipe } from "../../../store/useSprintImportPipe";
import { UnimportTable } from "./UnimportTable/UnimportTable";

export const SprintImport = () => {
  const { data: currentSprints, isLoading: currentLoading } = useSprints();
  const [enabled, setEnabled] = useState(false);
  const [key, setKey] = useState(0);
  const params: GetJiraSprints = useMemo(() => {
    if (!currentSprints || currentSprints.body.length === 0) {
      return {
        state: "closed",
      };
    }
    return {
      startAt: currentSprints.body.length,
      state: "closed",
    };
  }, [currentSprints]);
  const { data, isLoading } = useJiraSprints(params, enabled);
  const resetStep = useSprintImportPipe((state) => state.resetStep);
  const startStep = useSprintImportPipe((state) => state.startStep);
  const setSprintIds = useSprintImportPipe((state) => state.setSprintIds);
  const currentId = useSprintImportPipe((state) => state.currentId);

  const handleSubmit = useCallback(() => {
    setEnabled(true);
    setKey((prev) => prev + 1);
  }, []);

  useEffect(
    () => () => {
      resetStep();
    },
    [resetStep],
  );

  useEffect(() => {
    if (data) {
      setSprintIds(data.body.values.map((d) => d.id));
    }
  }, [data, setSprintIds]);

  return (
    <Flex direction="column">
      <Flex justify="space-between" mt={16}>
        <Box>
          <Button onClick={handleSubmit} disabled={currentLoading}>
            未取込スプリント取得
          </Button>
        </Box>
        {enabled && (
          <Box>
            <Button onClick={startStep} disabled={currentId !== null}>
              取込実行
            </Button>
          </Box>
        )}
      </Flex>
      <UnimportTable
        key={key}
        data={data?.body}
        isLoading={isLoading && enabled}
      />
    </Flex>
  );
};
