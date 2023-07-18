import {
  Box,
  Flex,
  Loader,
  MultiSelect,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import { FC, useEffect, useMemo, useState } from "react";
import { GiProgression } from "react-icons/gi";
import { IoIosTimer } from "react-icons/io";
import { useUpdateJiraEpic } from "../../../api/hooks";
import { EpicIssue } from "../../../types/epic";
import { useNextSprintTime } from "../../../store/useNestSprintTime";
import { useStoryLabels } from "../../../store/useStoryLabels";
import { SprintIssueTaskBody } from "./SprintIssueTaskBody";
import { IssueLink } from "../../../components/link/IssueLink";
import { useExcludeEpics } from "../../../store/useExcludeEpics";

interface StatusBodyProps {
  status: "idle" | "executing" | "success" | "error";
}

const StatusBody: FC<StatusBodyProps> = ({ status }) => {
  if (status === "idle") {
    return <div />;
  }
  if (status === "executing") {
    return (
      <Flex align="center">
        <Loader size="xs" />
        <Text>更新中...</Text>
      </Flex>
    );
  }
  if (status === "success") {
    return <Text>成功</Text>;
  }

  return <Text>エラー</Text>;
};

interface SprintIssueItemProps {
  epic: {
    key: string;
    fields: EpicIssue;
  };
  execute: boolean;
  sprintId: number;
}

export const SprintIssueItem: FC<SprintIssueItemProps> = ({
  epic,
  execute,
  sprintId,
}) => {
  const storyLabels = useStoryLabels((state) => state.storyLabels);
  const [labels, setLabels] = useState(
    Array.from(new Set([...epic.fields.labels, ...storyLabels])),
  );
  const [labelData, setLabelData] = useState(
    labels.map((label) => ({ label, value: label })),
  );
  const [status, setStatus] = useState<
    "idle" | "executing" | "success" | "error"
  >("idle");
  const { mutate: updateEpic } = useUpdateJiraEpic({
    onSuccess: () => {
      setStatus("success");
    },
    onError: () => {
      setStatus("error");
    },
  });
  const times = useNextSprintTime((state) => state.times);
  const excludeEpics = useExcludeEpics((state) => state.excludeEpics);

  const timeSum = useMemo(
    () =>
      times
        .filter((time) => time.parent === epic.key)
        .reduce((sum, time) => sum + time.time, 0),
    [epic.key, times],
  );

  useEffect(() => {
    if (execute && status === "idle" && !excludeEpics.includes(epic.key)) {
      setStatus("executing");
      updateEpic({ params: { key: epic.key }, body: { labels } });
    }
  }, [epic.key, excludeEpics, execute, labels, status, updateEpic]);

  if (excludeEpics.includes(epic.key)) {
    return <></>;
  }

  return (
    <Paper id={epic.key} shadow="md" radius="xs" p="md" mb={8}>
      <Flex direction="column" sx={{ gap: 4 }}>
        <Flex sx={{ gap: 12 }}>
          <Box>
            <IssueLink issueId={epic.key} size="sm">
              {epic.key}
            </IssueLink>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Text fz="lg" truncate>
              {epic.fields.summary}
            </Text>
          </Box>
          <Flex align="center">
            <GiProgression size="1.2rem" />
            {epic.fields.customfield_10016 !== undefined && (
              <Text ml={2}>{epic.fields.customfield_10016} pt</Text>
            )}
          </Flex>
          <Flex align="center">
            <IoIosTimer size="1.2rem" />
            <Text ml={2}>{timeSum} h</Text>
          </Flex>
        </Flex>
        <Flex align="center">
          <Flex miw={300} align="center" sx={{ gap: 6 }}>
            <Box>
              <MultiSelect
                label="ラベル"
                data={labelData}
                value={labels}
                searchable
                creatable
                clearable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = { value: query, label: query };
                  setLabelData((current) => [...current, item]);
                  return item;
                }}
                onChange={(value) => setLabels(value)}
              />
            </Box>
            <Box w={100}>
              <StatusBody status={status} />
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" mt={12}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 100 }}>ID</th>
              <th style={{ width: 100 }}>ステータス</th>
              <th style={{ width: 300 }}>タスク名</th>
              <th style={{ width: 100 }}>見積h</th>
              <th>ラベル</th>
              <th style={{ width: 100 }}> </th>
            </tr>
          </thead>
          <tbody>
            <SprintIssueTaskBody
              epicKey={epic.key}
              execute={execute}
              sprintId={sprintId}
            />
          </tbody>
        </Table>
      </Flex>
    </Paper>
  );
};
