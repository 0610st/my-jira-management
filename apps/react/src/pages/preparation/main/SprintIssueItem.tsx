import {
  Box,
  Flex,
  Loader,
  MultiSelect,
  Paper,
  Slider,
  Table,
  Text,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { UpdateJiraEpicProps, useUpdateJiraEpic } from "../../../../api/hooks";
import { EpicIssue } from "../../../../types/epic";
import { useStoryLabels } from "../../../store/useStoryLabels";
import { SprintIssueTaskBody } from "./SprintIssueTaskBody";

interface Props {
  epic: {
    key: string;
    fields: EpicIssue;
  };
  execute: boolean;
  sprintId: number;
}

export const SprintIssueItem: FC<Props> = ({ epic, execute, sprintId }) => {
  const storyLabels = useStoryLabels((state) => state.storyLabels);
  const [labels, setLabels] = useState(
    Array.from(new Set([...epic.fields.labels, ...storyLabels]))
  );
  const [labelData, setLabelData] = useState(
    labels.map((label) => ({ label: label, value: label }))
  );
  const [status, setStatus] = useState<
    "idle" | "executing" | "success" | "error"
  >("idle");
  const { mutate: updateEpic } = useUpdateJiraEpic({
    onSuccess: () => {
      setStatus("success");
    },
    onError: (error) => {
      console.error(error);
      setStatus("error");
    },
  });

  useEffect(() => {
    if (execute && status === "idle") {
      setStatus("executing");
      const params: UpdateJiraEpicProps = {
        key: epic.key,
        body: {
          labels: labels,
        },
      };
      updateEpic(params);
    }
  }, [execute, status]);

  return (
    <Paper shadow="md" radius="xs" p="md" mb={8}>
      <Flex direction="column" sx={{ gap: 4 }}>
        <Text c="dimmed" fz="sm">
          {epic.key}
        </Text>
        <Text fz="lg">{epic.fields.summary}</Text>
        <Flex maw={600} align="flex-end" sx={{ gap: 6 }}>
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
          <Box w={150}>
            {status === "idle" ? (
              <></>
            ) : status === "executing" ? (
              <Flex align="center">
                <Loader size="xs" />
                <Text>更新中...</Text>
              </Flex>
            ) : status === "success" ? (
              <Text>成功</Text>
            ) : (
              <Text>エラー</Text>
            )}
          </Box>
        </Flex>
        <Box w={400} my={32}>
          <Slider
            labelAlwaysOn
            marks={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 5, label: "5" },
              { value: 8, label: "8" },
              { value: 13, label: "13" },
              { value: 21, label: "21" },
            ]}
            max={25}
            value={epic.fields.customfield_10016 || undefined}
          />
        </Box>
      </Flex>
      <Flex direction="column">
        <Table>
          <thead>
            <tr>
              <th style={{ width: 100 }}>ID</th>
              <th style={{ width: 300 }}>タスク名</th>
              <th style={{ width: 100 }}>見積h</th>
              <th>ラベル</th>
              <th style={{ width: 100 }}></th>
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
