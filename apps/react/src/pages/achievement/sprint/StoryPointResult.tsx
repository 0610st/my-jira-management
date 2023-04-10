import { Box, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";

interface Props {
  sprintId: string | null;
  width: number;
  height: number;
}
export const StoryPointResult: FC<Props> = ({ sprintId, width, height }) => {
  return (
    <Flex w={width} h={height} direction="column">
      <Box sx={{ textAlign: "center" }}>
        <Text size={100}>15</Text>
      </Box>
      <Flex>
        <Flex sx={{ flexGrow: 1 }} direction="column" align="center">
          <Text fz="md">前々スプリント比</Text>
          <BsArrowUpRight size={48} color="#F06595" />
          <Text fz="md">(+1)</Text>
        </Flex>
        <Flex sx={{ flexGrow: 1 }} direction="column" align="center">
          <Text fz="md">前スプリント比</Text>
          <BsArrowDownRight size={48} color="#339AF0" />
          <Text fz="md">(-1)</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
