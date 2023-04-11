import { Flex, Text } from "@mantine/core";
import { FC } from "react";
import { BsArrowRight, BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

interface Props {
  from: number | null;
  to: number | null;
  label: string;
}

export const StoryPointResultCompare: FC<Props> = ({ from, to, label }) => {
  if (from === null || to === null) {
    return (
      <Flex sx={{ flexGrow: 1 }} direction="column" align="center">
        <Text fz="md">{label}</Text>
        <Text fz="md">-</Text>
      </Flex>
    );
  }

  return (
    <Flex sx={{ flexGrow: 1 }} direction="column" align="center">
      <Text fz="md">{label}</Text>
      {to > from ? (
        <BsArrowUpRight size={48} color="#F06595" />
      ) : to < from ? (
        <BsArrowDownRight size={48} color="#339AF0" />
      ) : (
        <BsArrowRight size={48} />
      )}
      <Text fz="md">{`(${(to < from ? "" : "+") + (to - from)})`}</Text>
    </Flex>
  );
};
