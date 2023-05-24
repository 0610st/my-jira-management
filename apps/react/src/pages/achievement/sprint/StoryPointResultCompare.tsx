import { Flex, Text } from "@mantine/core";
import { FC } from "react";
import { BsArrowRight, BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

interface Props {
  from: number | null;
  to: number | null;
  label: string;
}

const CompareIcon: FC<{ from: number; to: number }> = ({ from, to }) => {
  if (to > from) {
    return <BsArrowUpRight size={48} color="#F06595" />;
  }
  if (to < from) {
    return <BsArrowDownRight size={48} color="#339AF0" />;
  }
  return <BsArrowRight size={48} />;
};

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
      <CompareIcon from={from} to={to} />
      <Text fz="md">{`(${to < from ? `${to - from}` : `+${to - from}`})`}</Text>
    </Flex>
  );
};
