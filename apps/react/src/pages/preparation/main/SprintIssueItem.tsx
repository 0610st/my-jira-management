import {
  Box,
  Flex,
  MultiSelect,
  Paper,
  Slider,
  Table,
  Text,
} from "@mantine/core";
import { FC, useState } from "react";
import { EpicIssue } from "../../../../types/epic";
import { useStoryLabels } from "../../../store/useStoryLabels";
import { SprintIssueTaskBody } from "./SprintIssueTaskBody";

interface Props {
  epic: {
    key: string;
    fields: EpicIssue;
  };
}

export const SprintIssueItem: FC<Props> = ({ epic }) => {
  const storyLabels = useStoryLabels((state) => state.storyLabels);
  const [labels, setLabels] = useState([...epic.fields.labels, ...storyLabels]);
  const [labelData, setLabelData] = useState(
    labels.map((label) => ({ label: label, value: label }))
  );

  return (
    <Paper shadow="xs" radius="xs" p="md">
      <Flex direction="column" sx={{ gap: 4 }}>
        <Text c="dimmed" fz="sm">
          {epic.key}
        </Text>
        <Text fz="lg">{epic.fields.summary}</Text>
        <Box maw={500}>
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
            <SprintIssueTaskBody epicKey={epic.key} />
          </tbody>
        </Table>
      </Flex>
    </Paper>
  );
};
