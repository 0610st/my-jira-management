import { Box, Center, SegmentedControl } from "@mantine/core";
import { BsGraphUp, BsTable } from "react-icons/bs";
import { FC } from "react";

export interface SprintSummaryMenuProps {
  menu: string;
  onChange: (value: string) => void;
}

export const SprintSummaryMenu: FC<SprintSummaryMenuProps> = ({
  menu,
  onChange,
}) => {
  return (
    <SegmentedControl
      value={menu}
      onChange={onChange}
      data={[
        {
          value: "graph",
          label: (
            <Center>
              <BsGraphUp size="1rem" />
              <Box ml={10}>グラフ</Box>
            </Center>
          ),
        },
        {
          value: "table",
          label: (
            <Center>
              <BsTable size="1rem" />
              <Box ml={10}>テーブル</Box>
            </Center>
          ),
        },
      ]}
    />
  );
};
