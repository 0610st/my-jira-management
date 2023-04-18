import { Box, Flex, Paper, Slider, Table, Text } from "@mantine/core";
import { FC } from "react";
import { EpicIssue } from "../../../../types/epic";
import { SprintIssueTaskBody } from "./SprintIssueTaskBody";

interface Props {
  epic: {
    key: string;
    fields: EpicIssue;
  };
}

export const SprintIssueItem: FC<Props> = ({ epic }) => {
  return (
    <Paper shadow="xs" radius="xs" p="md">
      <Flex direction="column" sx={{ gap: 4 }}>
        <Text c="dimmed" fz="sm">
          {epic.key}
        </Text>
        <Text fz="lg">{epic.fields.summary}</Text>
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
              <th>見積h</th>
              <th style={{ width: 150 }}>ラベル</th>
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
